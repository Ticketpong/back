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

const manageAdd = async (id, password, name, phone, role, part) => {
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

// id 중복체크
const idCheck = async (id) => {
  let sql = `SELECT user_id FROM MEMBER WHERE user_id = ?`;
  let params = [id];
  console.log(sql);

  return new Promise((resolve, reject) => {
    dbconn.query(sql, params, (err, result) => {
      try {
        if (result.length === 0) {
          console.log(result);
          resolve(true);
        } else {
          console.log(result);
          resolve(false);
        }
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  });
};

// email 중복체크
const emailCheck = async (email) => {
  let sql = `SELECT user_email FROM MEMBER WHERE user_email = ?`;
  let params = [email];
  console.log(sql);

  return new Promise((resolve, reject) => {
    dbconn.query(sql, params, (err, result) => {
      try {
        if (result.length === 0) {
          console.log(result);
          resolve(true);
        } else {
          console.log(result);
          resolve(false);
        }
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  });
};

module.exports = { memberSignup, manageAdd, idCheck, emailCheck };
