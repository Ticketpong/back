const dbconn = require("../config/mariadb");

// performance get list
const performanceList = async () => {
  try {
    const ITEMS_PER_PAGE = 10; // items per page
    const offset = (page - 1) * ITEMS_PER_PAGE; // offset

    const sql = `SELECT PERFORMANCE.*, PERFORMANCEHALL.*, BOXOFFICE.*
    FROM PERFORMANCE
    LEFT JOIN PERFORMANCEHALL ON PERFORMANCE.mt10id = PERFORMANCEHALL.mt10id
    LEFT JOIN BOXOFFICE ON PERFORMANCE.mt20id = BOXOFFICE.mt20id`;

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
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// performance delete
const deletePerformance = (mt20id) => {
  try {
    const sql = `DELETE FROM performance WHERE mt20id = ?`;
    let params = [mt20id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
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

// performance add
const addPerformance = (req, res) => {
  try {
    const sql = `INSERT INTO performance (mt20id, prfnm, prfpdfrom, prfpdto, fcltynm, genrenm, prfcast, prfcrew, prfruntime, prfage, entrpsnm, pcseguidance, poster, sty, genrenm2, prfcast2, prfcrew2, prfruntime2, prfage2, entrpsnm2, pcseguidance2, poster2, sty2) VALUES (?,)`;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { performanceList, deletePerformance, addPerformance };
