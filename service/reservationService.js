const { db } = require("../config/mariadb");
const dbconn = require("../model/dbPool");

const postReservation = async (
  userId,
  res_date,
  date,
  time,
  people,
  success,
  selectseat,
  watchstate,
  prestate,
  paid
) => {
  return new Promise((resolve, reject) => {
    const _sym = "abcdefghijklmnopqrstuvwxyz1234567890";
    const imp_uid = "";
    for (var i = 0; i < 20; i++) {
      imp_uid += _sym[parseInt(Math.random() * _sym.length)];
    }
    console.log(imp_uid);

    const manageIdQuery = `SELECT manage_id FROM PERFORMANCE WHERE manage_id = ?`;
    const userIdQuery = `SELECT user_id FROM MEMBER WHERE user_id = ?`;
    const mt10idQuery = `SELECT mt10id FROM PERFORMANCE WHERE mt10id = ?`;
    const prfnmQuery = `SELECT prfnm FROM PERFORMANCE WHERE prfnm = ?`;

    db.query(manageIdQuery, [manage_id], (err, manageResult) => {
      if (err) {
        console.log(err);
        resolve(false).send("manage_id error");
      }
      db.query(mt10idQuery, [mt10id], (err, mt10idResult) => {
        if (err) {
          console.log(err);
          resolve(false).send("mt10id error");
        }
        db.query(prfnmQuery, [prfnm], (err, prfnmResult) => {
          if (err) {
            console.log(err);
            resolve(false).send("prfnm error");
          }
          const manage_id = manageResult[0].manage_id;
          const mt10id = mt10idResult[0].mt10id;
          const prfnm = prfnmResult[0].prfnm;

          let sql = `INSERT INTO RESERVATION VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
          let params = [
            imp_uid,
            userId,
            manage_id,
            mt10id,
            prfnm,
            res_date,
            paid,
            success,
            watchstate,
            (prestate = 0),
            date,
            time,
            selectseat,
            people,
          ];

          console.log(sql);

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
      });
    });
  });
};

const getReservation = async () => {
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

module.exports = { postReservation, getReservation, cancelReservation };
