const { db } = require("../config/mariadb");
const dbconn = require("../model/dbPool");

const postReservation = async (
  imp_uid,
  buyer_name,
  paid_amount,
  prfnm,
  selectdate,
  selecttime,
  res_date,
  people,
  success,
  selectseat,
  watchstate
) => {
  return new Promise((resolve, reject) => {
    let userIdQuery = `SELECT user_id FROM MEMBER WHERE user_name = ?`;
    let performanceIdQuery = `SELECT * FROM PERFORMANCE WHERE prfnm = ?`;
    let reservationQuery = `INSERT INTO RESERVATION * VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    dbconn.query(userIdQuery, [buyer_name], (err, userIdResult) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        let userId = userIdResult[0].user_id;
        dbconn.query(
          performanceIdQuery,
          [prfnm],
          (err, performanceIdResult) => {
            if (err) {
              console.log(err);
              resolve(false);
            } else {
              let mt20id = performanceIdResult[0].mt20id;
              let mt10id = performanceIdResult[0].mt10id;
              let manage_id = performanceIdResult[0].manage_id;

              if (selectseat === null) {
                selectseat = " ";
              }

              let prestate = false;

              let params = [
                imp_uid,
                mt20id,
                manage_id,
                mt10id,
                userId,
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

              dbconn.query(reservationQuery, params, (err, result) => {
                if (err) {
                  console.log(err);
                  resolve(false);
                } else {
                  console.log(result);
                  resolve(true);
                }
              });
            }
          }
        );
      }
    });
  });
};

const reservationList = async () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM RESERVATION where user_id = ?`;
    dbconn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
};

const cancelReservation = (imp_uid) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM RESERVATION WHERE imp_uid = ?`;
    dbconn.query(sql, [imp_uid], (err, result) => {
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

module.exports = { postReservation, reservationList, cancelReservation };
