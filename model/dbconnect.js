const mariadb = require("mysql2");
const dbconfig = require("../config/mariadb");

const db = mariadb.createConnection(
  (host = dbconfig.host),
  (user = dbconfig.user),
  (password = dbconfig.password),
  (port = dbconfig.port),
  (database = dbconfig.database)
);

db.connect((err) => {
  if (err) {
    console.log("DBconnect 연결 실패" + err);
  } else {
    console.log("DBconnect 연결 성공");
  }
});

module.exports = db;
