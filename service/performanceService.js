const dbconn = require("../config/mariadb");

// performance get list
const performanceList = async () => {
  try {
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
    const sql = `INSERT INTO performance * VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const params = {
      mt20id,
      manage_id,
      mt10id,
      prfnm,
      prfpdfrom,
      prfpdto,
      prfruntime,
      pcseguidance,
      genrenm,
      prfstate,
      update,
      poster,
      styurl,
      dtguidancem,
      post,
      prfage,
    };

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

module.exports = { performanceList, deletePerformance, addPerformance };
