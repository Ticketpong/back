const axios = require("axios");
const xml2js = require("xml-js");
const dbconn = require("../../config/mariadb");

// 공연 예매상황판 정보 저장
const getResData = async () => {
  try {
    console.log("공연예매상황판 정보 가져오기 시작");
    const response = await axios.get(
      `http://kopis.or.kr/openApi/restful/boxoffice?service=3fe13cc59eba4d328faa4d0c7dff5b3e&ststype=month&date=20240331`
    );

    const xmlData = response.data;
    // console.log(xmlData);
    const jsonData = xml2js.xml2json(xmlData, { compact: true, spaces: 4 });
    const result = JSON.parse(jsonData);

    const resData = result.boxofs.boxof;

    // console.log(resData);

    const manageId = "manage1";
    let cnt = 0;

    resData.forEach((item) => {
      try {
        const mt20idQuery = `SELECT mt20id FROM PERFORMANCE WHERE mt20id = ?`;
        const mt20idParams = [item.mt20id._text];

        dbconn.db.query(mt20idQuery, mt20idParams, (err, result) => {
          if (err) {
            console.error("DB 조회 실패:", err);
          }
          if (result.length === 0) {
            console.log("DB에 없는 mt20id:", item.mt20id._text);
          }
          setTimeout(() => {
            console.log("10초 후 실행");
          }, 10000);
          let areaText = "";
          if (item.area && item.area._text) {
            areaText = item.area._text;
          }

          getSaveBoxoffice(item, manageId, areaText);
          cnt++;
        });
      } catch (error) {
        console.log("getSaveBoxoffice 에러:", error);
      }
    });
    console.log(cnt);
  } catch (error) {
    console.error("saveResData 에러:", error);
    return "error";
  }
};

// 공연장 상세정보 받아오기
const getSaveBoxoffice = async (item, manageId, areaText) => {
  try {
    const sql = `INSERT INTO BOXOFFICE (mt20id, manage_id, rnum, prfdtcnt) VALUES(?,?,?,?)`;

    const params = [
      item.mt20id._text, // mt20id
      manageId, // manage_id
      item.rnum._text, // rnum
      item.prfdtcnt._text, // prfdtcnt
      areaText, // area
    ];
    new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, result) => {
        if (err) {
          console.error("DB 저장 실패:", err);
          reject(err);
        }
        console.log("DB 저장 완료");
        resolve(result);
      });
    });
    console.log("mt10id 가져오기 완료");
  } catch (error) {
    console.error("공연장 상세정보 가져오기 실패:", error);
  }
};

module.exports = { getResData };
