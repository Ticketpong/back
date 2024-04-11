const dbconn = require("../config/mariadb");

// reservationList
const reservationList = async (id) => {
  let sql = `SELECT * FROM RESERVATION WHERE user_id = ?`;
  let params = [id];

  console.log(sql, params);

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
};

// memberInfo
const memberInfo = async (user_id) => {
  let sql = `SELECT * FROM MEMBER WHERE user_id = ?`;
  let params = [user_id];
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
};

// postReservation
const postReservation = async (
  imp_uid,
  mt20id,
  mt10id,
  user_id,
  res_date,
  paid_amount,
  success,
  watchstate,
  selectdate,
  selecttime,
  selectseat,
  people
) => {
  let manageidQuery = `SELECT manage_id FROM PERFORMANCE WHERE mt20id = ?`;
  let reservationQuery = `INSERT INTO RESERVATION VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  return new Promise((resolve, reject) => {
    dbconn.db.query(manageidQuery, [mt20id], (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        let prestate = false;
        console.log(result[0].manage_id);
        manage_id = result[0].manage_id;
        const params = [
          imp_uid,
          mt20id,
          manage_id,
          mt10id,
          user_id,
          res_date,
          paid_amount,
          success,
          watchstate,
          prestate,
          selectdate,
          selecttime,
          selectseat,
          people,
        ];
        dbconn.db.query(reservationQuery, params, (err, result) => {
          if (err) {
            console.log(err);
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
};

// cancelReservation
const cancelReservation = async (imp_uid) => {
  let sql = `UPDATE RESERVATION SET success = false WHERE imp_uid = ?`;
  let params = [imp_uid];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// discountCard
const discountCard = async (code) => {
  let sql = `SELECT * FROM DISCOUNT WHERE code = ?`;
  let params = [code];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  reservationList,
  postReservation,
  memberInfo,
  cancelReservation,
  discountCard,
};
