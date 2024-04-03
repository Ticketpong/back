const axios = require("axios");
const xml2js = require("xml-js");
const dbconn = require("../../config/mariadb");

const savePlaceId = async () => {
  try {
    console.log("savePlaceId");
    const options = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/prfplc?service=3fe13cc59eba4d328faa4d0c7dff5b3e&cpage=1&rows=3000"
    );

    const xmlData = options.data;
    const placeInfo = xml2js.xml2json(xmlData, { compact: true, spaces: 4 });
    const result = JSON.parse(placeInfo);

    const placeList = result.dbs.db.map((item) => {
      setTimeout(() => {
        console.log("10초 후 실행");
      }, 10000);
      return {
        mt10id: item.mt10id ? item.mt10id._text : null,
        sidonm: item.sidonm ? item.sidonm._text : null,
      };
    });

    if (placeList != null) {
      placeList.forEach(({ mt10id, sidonm }) => {
        getPlaceDetail(mt10id, sidonm);
      });
      console.log("mt10id 가져오기 완료");
    }
  } catch (error) {
    console.log("savePlaceId 에러:", error);
  }
};

const getPlaceDetail = async (mt10id, sidonm) => {
  try {
    // console.log("getPlaceDetail");
    const response = await axios.get(
      `http://www.kopis.or.kr/openApi/restful/prfplc/${mt10id}`,
      {
        params: {
          service: "3fe13cc59eba4d328faa4d0c7dff5b3e",
          newsql: "Y",
        },
      }
    );

    const xmlData = response.data;
    const jsonData = xml2js.xml2json(xmlData, { compact: true, spaces: 4 });
    const result = JSON.parse(jsonData);

    const placeDetail = result.dbs.db;

    const sql = `INSERT INTO PERFORMANCEHALL (mt10id, fcltynm, sidonm, telno, la, lo, adres) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      mt10id, // mt10id
      placeDetail.fcltynm._text || "-", // fcltynm
      sidonm, // sidonm
      placeDetail.telno._text ? placeDetail.telno._text : "-", // telno
      placeDetail.la._text, // la
      placeDetail.lo._text, // lo
      placeDetail.adres._text || "-", // adres
    ];
    console.log(params);
    // DB에 저장
    new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, result) => {
        if (err) {
          console.log("DB 저장 실패:", err);
          reject(err);
        } else {
          console.log("DB 저장 완료");
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log("getPlaceDetail 에러:", error);
  }
};

module.exports = { savePlaceId };
