const dbconn = require("../config/mariadb");

// Get 최신순 으로 8개의 공연을 가져옴
const recentPerformance = async () => {
  try {
    const sql = `  (
      SELECT *
      FROM performance P
      JOIN PERFORMANCEHALL PH on P.mt10id = PH.mt10id
      WHERE genrenm = '대중음악'
      ORDER BY updatedate DESC
      LIMIT 8
    )
    UNION ALL
    (
      SELECT *
      FROM performance P
      JOIN PERFORMANCEHALL PH on P.mt10id = PH.mt10id
      WHERE genrenm = '연극'
      ORDER BY updatedate DESC
      LIMIT 8
    )
    UNION ALL
    (
      SELECT *
      FROM performance P
      JOIN PERFORMANCEHALL PH on P.mt10id = PH.mt10id
      WHERE genrenm = '뮤지컬'
      ORDER BY updatedate DESC
      LIMIT 8
    )
    UNION ALL
    (
      SELECT *
      FROM performance P
      JOIN PERFORMANCEHALL PH on P.mt10id = PH.mt10id
      WHERE genrenm NOT IN ('대중음악', '연극', '뮤지컬')
      ORDER BY updatedate DESC
      LIMIT 8
    )`;

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

// Get 인기순으로 8개의 공연을 가져옴
const ranking = async () => {
  try {
    const sql = `SELECT * FROM PERFORMANCE P 
    JOIN PERFORMANCEHALL PH on P.mt10id = PH.mt10id 
    JOIN BOXOFFICE B on P.mt20id = B.mt20id ORDER BY rnum LIMIT 12`;

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

// get review list
const reviewList = async () => {
  try {
    const sql = `SELECT * FROM review order by recommend desc limit 5`;

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

module.exports = { recentPerformance, ranking, reviewList };
