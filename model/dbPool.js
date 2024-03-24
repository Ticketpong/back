const mariadb = require("mysql2");
const { info } = require("../config/mariadb");

const pool = mariadb.createPool({
  host: info.host,
  user: info.user,
  password: info.password,
  port: info.port,
  database: info.database,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.log("Pool DB연결 실패: " + err);
  } else {
    console.log("Pool DB 연결 성공");
  }
});

module.exports = pool;
