const dbconn = require("../config/mariadb");

// 검색창
const search = async (keyword) => {
  const sql = `SELECT * FROM PERFORMANCE WHERE prfnm LIKE ?`;
  const params = [`%${keyword}%`];

  console.log(sql, params);
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error reading search:", err);
        resolve(false);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
};

module.exports = { search };
