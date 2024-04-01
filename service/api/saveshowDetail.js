const request = require("request");
const xml2json = require("xml-js");

const { db } = require("../../config/mariadb"); // DB 정보 require

/// API에서 공연 정보를 가져와서 데이터베이스에 저장하는 함수
function saveShowData() {
  console.log("공연정보 먼저실행");
  const options = {
    method: "GET",
    url: "http://www.kopis.or.kr/openApi/restful/pblprfr",
    qs: {
      service: "fa3c8f8cc2c94da2bf5e4a40f8d54321",
      stdate: "20240301",
      eddate: "20240331",
      cpage: 1,
      rows: 1000,
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error("Error:", error);
      return;
    }

    const info = JSON.parse(
      xml2json.xml2json(body, { compact: true, spaces: 4 })
    );

    const showIds = info.dbs.db.map((item) =>
      item.mt20id ? item.mt20id._text : null
    );

    console.log(showIds);

    if (showIds != null) {
      showIds.forEach((showId) => {
        getShowDetail(showId);
      });
    }
    console.log("공연정보 insert끝");
  });
}

// 공연 상세 정보를 가져와서 데이터베이스에 저장하는 함수
function getShowDetail(showId) {
  // api호출에 필요한 URL 및 파라미터
  const showInfoOptions = {
    method: "GET", // URL 요청 타입
    url: `http://www.kopis.or.kr/openApi/restful/pblprfr/${showId}`, // 요청 URL + 공연아이디가 상세조회에 필요하다.
    qs: {
      // qs : API 요청에 필요한 파라미터
      service: "fa3c8f8cc2c94da2bf5e4a40f8d54321", // serviceKey
    },
  };

  request(showInfoOptions, function (error, response, body) {
    // 요청 보내기
    if (error) {
      console.error("Error:", error);
      return;
    }

    // api 호출 결과
    const detailInfo = JSON.parse(
      xml2json.xml2json(body, { compact: true, spaces: 4 })
    );

    const item = detailInfo.dbs.db; // dbs안에 db라는 이름의 리스트에서 데이터 꺼냄

    let styurl = "";
    if (item.styurls && item.styurls.styurl) {
      if (Array.isArray(item.styurls.styurl)) {
        styurl = item.styurls.styurl[0]._text;
      } else {
        styurl = item.styurls.styurl._text;
      }
    }

    // 외래키로 연결되는 데이터들은 id값을 가져와서 저장
    const manage_id = "manager";
    const managerIdQuery = `SELECT id FROM MANAGE WHERE manage_id = ?`;

    db.query(managerIdQuery, manage_id, function (err, manageResult) {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }

      //const manegerId = manageResult[0].id;
      const sql = `INSERT INTO PERFORMANCE (prfnm, manager_id, mt10id, mt20id,  prfpdfrom, prfpdto, prfruntime, pcseguidance, genrenm, prfstate, updatedate, poster, styurl, dtguidance, prfage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        item.prfnm._text, // 공연제목
        manage_id, //  아이디
        mt10id, // 공연시설ID
        item.mt20id._text, // 공연아이디 "mt20id"
        item.prfpdfrom._text, // 공연시작일
        item.prfpdto._text, // 공연종료일
        item.prfruntime._text, // 공연 런타임
        item.pcseguidance._text, // 티켓가격
        item.genrenm._text, // 장르
        item.prfstate._text, // 공연상태
        item.updatedate ? item.updatedate._text : null, // 최종수정일
        item.poster._text, // 포스터 이미지 경로
        styurl, // 소개 이미지
        item.dtguidance._text, // 공연시간
        item.prfage._text, // 관람등급
      ];
      // 쿼리 실행
      db.query(sql, values, function (err, result) {
        if (err) {
          console.error("Error inserting data:", err);

          return;
        }
        console.log("Data inserted successfully.");
      });
    });
  });
}

// 데이터 저장 함수 호출
module.exports = { saveShowData, getShowDetail };
