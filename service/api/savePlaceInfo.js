const request = require("request");
const xml2json = require("xml-js");

const { db } = require("../../config/mariadb"); // DB 정보 require


//시설 상세 정보를 가져와서 데이터베이스에 저장하는 함수
function savePlaceInfo() {

  const selectPlaceIdQuery = `SELECT mt10id FROM PERFORMANCE `;

  // 쿼리 실행
  db.query(selectPlaceIdQuery, function (err, placeIdResult) {
    if (err) {
      console.error("Error inserting data:", err);
      return;
    }
    console.log("Data inserted successfully.");
  

  for (const result of placeIdResult) {
    const placeId = result.mt10id;

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
        placeId, // 공연시설ID
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
  });
}



// 데이터 저장 함수 호출
savePlaceInfo(); //공연시설 정보 저장