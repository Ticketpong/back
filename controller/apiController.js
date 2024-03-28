const request = require("request");
const xml2json = require("xml-js");

const { db } = require("../config/mariadb.js"); // DB 정보 require

// API에서 공연 정보를 가져와서 데이터베이스에 저장하는 함수
function saveShowData() {
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

    const showIds = info.dbs.db.map((item) => item.mt10id._text);

    showIds.forEach((showId) => {
      savePlaceInfo(showId);
    });
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

  request(getShowDetailOptions, function (error, response, body) {
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
    const managerIdQuery = `SELECT id FROM MANAGE WHERE manage_id = ?`;
    const mt10idQuery = `SELECT id FROM PERFORMANCEHALL WHERE mt10id = ?`;
    const mt20idQuery = `SELECT id FROM PERFORMANCE WHERE mt20id = ?`;

    db.query(managerIdQuery, function (err, manageResult) {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }

      db.query(mt10idQuery, function (err, mt10idResult) {
        if (err) {
          console.error("Error inserting data:", err);
          return;
        }

        db.query(mt20idQuery, function (err, mt20idResult) {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }

          const managerId = manageResult[0].id;
          const mt10id = mt10idResult[0].id;
          const mt20id = mt20idResult[0].id;

          const sql = `INSERT INTO PERFORMANCE (prfnm, manager_id, mt10id, mt20id,  prfpdfrom, prfpdto, prfruntime, pcseguidance, genrenm, prfstate, updatedate, poster, styurl, dtguidance, prfage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          const values = [
            item.prfnm._text, // 공연제목
            managerId, //  아이디
            mt10id, // 공연시설ID "mt10id"
            mt20id, // 공연아이디 "mt20id"
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
    });
  });
}

//시설 상세 정보를 가져와서 데이터베이스에 저장하는 함수
function savePlaceInfo(placeId) {
  const options = {
    method: "GET",
    url: `http://www.kopis.or.kr/openApi/restful/prfplc/${placeId}`,
    qs: {
      service: "fa3c8f8cc2c94da2bf5e4a40f8d54321",
      newsql: "Y",
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error("Error:", error);
      return;
    }

    const placeInfo = JSON.parse(
      xml2json.xml2json(body, { compact: true, spaces: 4 })
    );

    const item = placeInfo.dbs.db;
    const sql = `INSERT INTO PERFORMANCEHALL (mt10id, fcltynm, telno, la, lo) VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      item.mt10id._text, // 공연시설ID
      item.fcltynm._text, // 공연시설명
      item.telno._text, // 전화번호
      item.la._text, // 위도
      item.lo._text, // 경도
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
}

// 예매상황판 호출 및 저장 함수
function saveBoxOffice() {
  const options = {
    method: "GET",
    url: `http://www.kopis.or.kr/openApi/restful/boxoffice`,
    qs: {
      service: "fa3c8f8cc2c94da2bf5e4a40f8d54321",
      ststype: "month",
      date: "20240326",
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error("Error:", error);
      return;
    }

    const boxOfficeInfo = JSON.parse(
      xml2json.xml2json(body, { compact: true, spaces: 4 })
    );

    const items = boxOfficeInfo.boxofs; // 예매상황 목록

    const sql = `INSERT INTO BOXOFFICE (mt20id, rnum, prfdtcnt, area) VALUES (?, ?, ?, ?)`;

    items.boxof.forEach((item, index) => {
      const values = [
        item.mt20id._text, // 공연아이디
        item.rnum._text, // 순위
        item.prfdtcnt._text, // 예매수
        item.area._text, // 지역
      ];

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
savePlaceInfo(); // 공연정보 저장
saveBoxOffice(); // 예매상황판 저장 ..
getShowDetail(); // 공연 상세정보 저장
saveShowData(); // 공연정보 저장
