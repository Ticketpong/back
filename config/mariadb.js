const mariadb = require("mysql2");

info = {
  host: "localhost",
  user: "tiketpong",
  password: "tiketpong",
  port: 3306,
  database: "ticketpong",
};

let db = mariadb.createConnection(info);

db.connect((err) => {
  if (err) {
    console.log("DB 연결 실패" + err);
  } else {
    console.log("DB 연결 성공");
  }
});

module.exports = { db, info };
