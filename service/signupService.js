const dbconn = require("../model/dbPool");
let bcrypt = require("bcrypt-nodejs");

const memberSignup = async (
  id,
  pw,
  name,
  phone,
  email,
  address,
  detailAddress
) => {
  let hashedPassword = bcrypt.hashSync(pw);
  let sql = `INSERT INTO MEMBER VALUES (?, ?, ?, ?, ?, ?, ?)`;
  let params = [id, name, hashedPassword, email, phone, address, detailAddress];
  console.log(sql);

  return new Promise((resolve, reject) => {
    dbconn.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log(result);
        resolve(true);
      }
    });
  });
};

const manageAdd = async (id, name, password, phone, role, part) => {
  let hash = bcrypt.hashSync(password);
  let sql = `INSERT INTO MANAGE VALUES (?, ?, ?, ?, ?, ?)`;
  let params = [id, name, hash, phone, role, part];
  console.log(sql);

  return new Promise((resolve, reject) => {
    dbconn.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log(result);
        resolve(true);
      }
    });
  });
};

module.exports = { memberSignup, manageAdd };
