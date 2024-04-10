const dbconn = require("../config/mariadb");
const bcrypt = require("bcrypt-nodejs");

// member postmain page
const postMember = (id) => {
  const sql = `SELECT * FROM member WHERE user_id = ?`;
  let params = [id];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, rows) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(rows[0]);
      }
    });
  });
};

// post member Pwcheck
const postMemberPwCheck = (id, pw) => {
  const sql = `SELECT * FROM member WHERE user_id = ? `;
  let params = [id, pw];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, rows) => {
      if (err || rows.length === 0) {
        console.log(err);
        resolve(false);
      } else {
        console.log(rows[0].user_id, rows[0].user_password);
        bcrypt.compare(pw, rows[0].user_password, (err, isMatch) => {
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

// member get list
const memeberList = (req, res) => {
  const sql = `select m.*, count(r.user_id) AS res_count
  from MEMBER m
  left join RESERVATION r on m.user_id = r.user_id
  group by m.user_id`;
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
};

// member edit page
const editMember = (id, pw, email, address, detailAddress) => {
  try {
    let hash = bcrypt.hashSync(pw);
    const sql = `UPDATE member SET user_password= ?, user_email = ?, address = ?, detailAddress = ? WHERE user_id = ?`;
    let params = [hash, email, address, detailAddress, id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// member delete page
const deleteMember = (id) => {
  try {
    const sql = `DELETE FROM member WHERE user_id = ?`;
    let params = [id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage get list
const manageList = (req, res) => {
  const sql = `SELECT * FROM manage`;
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
};

// manage edit page
const editManage = (req, res) => {
  try {
    const sql = `UPDATE manage SET manage_password = ?, manage_phone = ?,manage_auth = ?, manage_part = ? WHERE manage_id = ?`;
    let params = [pw, email, phone, auth, part, id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage delete page
const deleteManage = async (id) => {
  try {
    const sql = `DELETE FROM manage WHERE manage_id = ?`;
    let params = [id];
    console.log(params);

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(sql);
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  postMember,
  postMemberPwCheck,
  memeberList,
  editMember,
  deleteMember,
  manageList,
  editManage,
  deleteManage,
};
