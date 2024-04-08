const dbconn = require("../config/mariadb");

// get ranking 5개
const ranking = async () => {
  try {
    const sql = `SELECT * FROM PERFORMANCE P 
    JOIN BOXOFFICE B on P.mt20id = B.mt20id
    ORDER BY rnum
    LIMIT 5`;

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// 전체 공연 가져오기
const viewAll = async () => {
  try {
    const sql = `SELECT * FROM PERFORMANCE P
    JOIN PERFORMANCEHALL PH on P.mt10id = PH.mt10id
    `;

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { viewAll, ranking };
