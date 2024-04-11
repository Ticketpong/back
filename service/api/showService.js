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

    let styurl = "";

    if (showDetail.styurls && showDetail.styurls.styurl) {
      if (Array.isArray(showDetail.styurls.styurl)) {
        styurl = showDetail.styurls.styurl[0]._text;
      } else {
        styurl = showDetail.styurls.styurl._text;
      }
    }

    const post = true;

    const manageIdQuery = `SELECT * FROM MANAGE WHERE manage_id= ?`;
    const manageId = "manage1";

    new Promise((resolve, reject) => {
      dbconn.db.query(manageIdQuery, manageId, async (err, manageResult) => {
        if (err) {
          console.error("MANAGE 테이블 조회 실패:", err);
          reject(err);
        }

        const query = `SELECT * FROM PERFORMANCE WHERE mt20id = ?`;
        const params = [showId];

        const result = await getPerformance(query, params);

        if (result.length === 0) {
          const placeQuery = `SELECT * FROM PERFORMANCEHALL WHERE mt10id = ?`;
          const placeParams = [showDetail.mt10id._text];
          const placeResult = await getPlace(placeQuery, placeParams);
          if (err || placeResult.length === 0) {
            reject(err);
          } else {
            const saveSql = `INSERT INTO PERFORMANCE (mt20id, manage_id, mt10id, prfnm, prfpdfrom, prfpdto, prfruntime, pcseguidance, genrenm, prfstate, updatedate, poster, styurl, dtguidance, post, prfage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const saveParams = [
              showId, // mt20id
              manageId, // manage_id
              showDetail.mt10id._text, // mt10id
              showDetail.prfnm._text, // prfnm
              showDetail.prfpdfrom._text, // prfpdfrom
              showDetail.prfpdto._text, // prfpdto
              showDetail.prfruntime._text, // prfruntime
              showDetail.pcseguidance._text, // pcseguidance
              showDetail.genrenm._text, // genrenm
              showDetail.prfstate._text, // prfstate
              showDetail.updatedate._text, // updatedate
              showDetail.poster._text, // poster
              styurl, // styurl
              showDetail.dtguidance._text, // dtguidance
              post, // post
              showDetail.prfage._text, // prfage
            ];

            const showDetailResult = await saveShowDetail(saveSql, saveParams);
            if (showDetailResult) {
              resolve(result);
            } else {
              reject(err);
            }
          }
        }
      });
    });
  } catch (error) {
    console.error("공연장 상세정보 저장 실패:", error);
    return "error";
  }
};

// 공연 정보 받아오기
const getPerformance = async (query, params) => {
  return new Promise((resolve, reject) => {
    dbconn.db.query(query, params, async (err, result) => {
      if (err) {
        console.error("DB 조회 실패:", err);
        reject(err);
      }
      console.log("DB 조회 완료");
      if (result.length === 0) {
        resolve(result);
      }
    });
  });
};

// 공연장 정보 받아오기
const getPlace = async (query, params) => {
  return new Promise((resolve, reject) => {
    dbconn.db.query(query, params, async (err, result) => {
      if (err) {
        console.error("DB 조회 실패:", err);
        reject(err);
      } else if (result.length === 0) {
        console.log("없는 데이터");
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// 공연장 정보 저장
const saveShowDetail = async (sql, params) => {
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.error("DB 저장 실패:", err);
        reject(err);
      }
      console.log("DB 저장 완료");
      resolve(result);
    });
  });
};

module.exports = { saveShowId };
