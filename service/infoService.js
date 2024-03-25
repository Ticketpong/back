const dbconn = require("../config/mariadb");

// member edit page
const editMember = (req, res) => {
  try {
    const sql = `UPDATE member SET pw = ?, email = ?, phone = ?, address = ?, detailAddress = ? WHERE id = ?`;
    let params = [pw, email, phone, address, detailAddress, id];

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
const deleteMember = (req, res) => {
  try {
    const sql = `DELETE FROM member WHERE id = ?`;
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

// manage get detail
const manageDetail = (req, res) => {
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

// manage edit page
const editManage = (req, res) => {
  try {
    const sql = `UPDATE manage SET pw = ?, phone = ?, auth = ?, part = ? WHERE id = ?`;
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
const deleteManage = (req, res) => {
  try {
    const sql = `DELETE FROM manage WHERE id = ?`;
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

module.exports = {
  editMember,
  deleteMember,
  manageDetail,
  editManage,
  deleteManage,
};
