const dbconn = require("../config/mariadb");
let bcrypt = require("bcrypt-nodejs");

const memberLogin = (id, pw, next) => {
  let sql = `SELECT * FROM MEMBER WHERE user_id = ?`;
  console.log(sql);

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, [id], (err, result) => {
      if (err || result.length === 0) {
        console.log("아이디 불일치");
        resolve(false);
      } else {
        // console.log(result[0].user_id, result[0].user_password);
        bcrypt.compare(pw, result[0].user_password, (err, isMatch) => {
          console.log(isMatch);
          if (err || !isMatch) {
            console.log("비밀번호 불일치");
            resolve(false);
          } else {
            console.log("비밀번호 일치");
            resolve(true);
          }
        });
      }
    });
  });
};

const manageLogin = (id, pw, next) => {
  let sql = `SELECT * FROM MANAGE WHERE manage_id = ?`;

  console.log(sql);

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, [id], (err, result) => {
      if (err || result.length === 0) {
        console.log("아이디 불일치");
        resolve(false);
      } else {
        console.log(result[0].manage_id, result[0].manage_password);

        bcrypt.compare(pw, result[0].manage_password, (err, isMatch) => {
          if (err || !isMatch) {
            console.log("비밀번호 불일치");
            resolve(false);
          } else {
            console.log("비밀번호 일치");
            resolve(true);
          }
        });
      }
    });
  });
};

module.exports = { memberLogin, manageLogin };
