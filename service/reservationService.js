const { db } = require("../config/mariadb");
const dbconn = require("../model/dbPool");

// memberInfo
const memberInfo = async (user_id) => {
  let sql = `SELECT * FROM MEMBER WHERE user_id = ?`;
  let params = [user_id];
  await dbconns(sql, params);
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
  let manageidQuery = `SELECT * FROM PERFORMANCE WHERE mt20id = ?`;
  let reservationQuery = `INSERT INTO RESERVATION * VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  return new Promise((resolve, reject) => {
    dbconn.query(manageidQuery, [mt20id], (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        let prestate = false;
        const params = [
          imp_uid,
          mt20id,
          result[0].manageid,
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
        dbconns(reservationQuery, params);
      }
    });
  });
};

// dbconns
const dbconns = (query, params) => {
  return new Promise((resolve, reject) => {
    dbconn.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
};

// reservationList
const reservationList = async (user_id) => {
  let sql = `SELECT * FROM RESERVATION where user_id = ?`;
  let params = [user_id];
  await dbconns(sql, params);
};

// cancelReservation
const cancelReservation = async (imp_uid) => {
  let sql = `DELETE FROM RESERVATION WHERE imp_uid = ?`;
  let params = [imp_uid];
  await dbconns(sql, params);
};

module.exports = {
  postReservation,
  memberInfo,
  reservationList,
  cancelReservation,
};
