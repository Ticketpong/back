const axios = require("axios");
const xml2js = require("xml-js");
const dbconn = require("../../config/mariadb");

// 공연 목록 받아오기
const saveShowId = async () => {
  try {
    console.log("공연장 정보 저장 시작");
    const options = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/pblprfr?service=3fe13cc59eba4d328faa4d0c7dff5b3e&stdate=20240301&eddate=20240331&cpage=1&rows=600"
    );

    const xmlData = options.data;
    console.log(xmlData);
    const showInfo = xml2js.xml2json(xmlData, { compact: true, spaces: 4 });
    const result = JSON.parse(showInfo);

    console.log(result);

    const showList = result.dbs.db.map((item) => {
      setTimeout(() => {
        console.log("10초 후 실행");
      }, 10000);
      return item.mt20id ? item.mt20id._text : null;
    });

    if (showList != null) {
      showList.forEach((showId) => {
        getShowDetail(showId);
      });
      console.log("공연장 정보 가져오기 완료");
    }
  } catch (error) {
    console.error("공연 db 저장 실패:", error);
    return "error";
  }
};

// 공연장 상세정보 받아오기
const getShowDetail = async (showId) => {
  try {
    console.log("공연장상세정보 시작");
    const response = await axios.get(
      `http://www.kopis.or.kr/openApi/restful/pblprfr/${showId}`,
      {
        params: {
          service: "3fe13cc59eba4d328faa4d0c7dff5b3e",
          newsql: "Y",
        },
      }
    );

    const xmlData = response.data;
    // console.log(xmlData);
    const jsonData = xml2js.xml2json(xmlData, { compact: true, spaces: 4 });
    const result = JSON.parse(jsonData);

    const showDetail = result.dbs.db;

    // const isValidGenre = (genre) => {
    //   const validGenre = ["연극"];
    //   return validGenre.includes(genre);
    // };

    // // 장르가 연극, 뮤지컬, 대중음악인 경우에만 저장
    // const genre = showDetail.genrenm._text;
    // if (!isValidGenre(genre)) {
    //   console.log("유효하지 않은 장르:", genre);
    //   return; // 장르가 유효하지 않으면 저장하지 않음
    // } else {
    //   return genre;
    // }

    let styurl = "";

    if (showDetail.styurls && showDetail.styurls.styurl) {
      if (Array.isArray(showDetail.styurls.styurl)) {
        styurl = showDetail.styurls.styurl[0]._text;
      } else {
        styurl = showDetail.styurls.styurl._text;
      }
    }

    const post = true;
    let cnt = 0;

    const manageIdQuery = `SELECT * FROM MANAGE WHERE manage_id= ?`;
    const manageId = "manage1";

    new Promise((resolve, reject) => {
      dbconn.db.query(manageIdQuery, manageId, (err, manageResult) => {
        if (err) {
          console.error("MANAGE 테이블 조회 실패:", err);
          reject(err);
        }

        const Query = `SELECT * FROM PERFORMANCE WHERE mt20id = ?`;
        const params = [showId];

        dbconn.db.query(Query, params, (err, result) => {
          if (err) {
            console.error("DB 조회 실패:", err);
            reject(err);
          }
          console.log("DB 조회 완료");
          if (result.length === 0) {
            const query = `SELECT * FROM PERFORMANCEHALL WHERE mt10id = ?`;
            const param = [showDetail.mt10id._text];
            dbconn.db.query(query, param, (err, result) => {
              if (err) {
                console.error("DB 조회 실패:", err);
                reject(err);
              } else if (result.length === 0) {
                console.log("없는 데이터");
              } else {
                const sql = `INSERT INTO PERFORMANCE (mt20id, manage_id, mt10id, prfnm, prfpdfrom, prfpdto, prfruntime, pcseguidance, genrenm, prfstate, updatedate, poster, styurl, dtguidance, post, prfage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                const params = [
                  showId, // mt20id
                  manageId, // manage_id
                  showDetail.mt10id._text ? showDetail.mt10id._text : "-", // mt10id
                  showDetail.prfnm._text ? showDetail.prfnm._text : "-", // prfnm
                  showDetail.prfpdfrom._text ? showDetail.prfpdfrom._text : "-", // prfpdfrom
                  showDetail.prfpdto._text ? showDetail.prfpdto._text : "-", // prfpdto
                  showDetail.prfruntime._text
                    ? showDetail.prfruntime._text
                    : "-", // prfruntime
                  showDetail.pcseguidance._text
                    ? showDetail.pcseguidance._text
                    : "-", // pcseguidance
                  showDetail.genrenm._text ? showDetail.genrenm._text : "-", // genrenm
                  // genre, // genrenm
                  showDetail.prfstate._text ? showDetail.prfstate._text : "-", // prfstate
                  showDetail.updatedate._text
                    ? showDetail.updatedate._text
                    : "-", // updatedate
                  showDetail.poster._text ? showDetail.poster._text : "-", // poster
                  styurl, // styurl
                  showDetail.dtguidance._text
                    ? showDetail.dtguidance._text
                    : "-", // dtguidance
                  post, // post
                  showDetail.prfage._text, // prfage
                ];
                dbconn.db.query(sql, params, (err, result) => {
                  if (err) {
                    console.error("DB 저장 실패:", err);
                    // return;
                    reject(err);
                  }
                  console.log("DB 저장 완료");
                  cnt++;

                  resolve(result);
                });
              }
            });
          }
        });
      });
    });
    console.log("공연장상세정보 완료");
    console.log(cnt);
  } catch (error) {
    console.error("공연장상세정보 에러:", error);
  }
};

module.exports = { saveShowId };
