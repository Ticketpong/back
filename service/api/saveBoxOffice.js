const request = require("request");
const xml2json = require("xml-js");

const { db } = require("../../config/mariadb"); // DB 정보 require


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
saveBoxOffice(); // 예매상황판 저장
