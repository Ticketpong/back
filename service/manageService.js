const dbconn = require("../config/mariadb");

const manage = (req, res) => {
  const sql = `SELECT * FROM manage WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, [id], (err, rows) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log(rows[0]);
        resolve(rows[0]);
      }
    });
  });
};

module.exports = { manage };
