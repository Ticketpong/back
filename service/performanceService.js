const dbconn = require("../config/mariadb");

// performance get list
const performanceList = async () => {
  try {
    const sql = `SELECT * FROM PERFORMANCE`;

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
    const sql = `DELETE FROM PERFORMANCE WHERE mt20id = ?`;
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

// performance edit
const editPerformance = (
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
  updatedate,
  poster,
  styurl,
  dtguidance,
  post,
  prfage
) => {
  const sql = `UPDATE PERFORMANCE SET manage_id = ?, mt10id = ?, prfnm = ?, prfpdfrom = ?, prfpdto = ?, prfruntime = ?, pcseguidance = ?, genrenm = ?, prfstate = ?, updatedate = ?, poster = ?, styurl = ?, dtguidance = ?, post = ?, prfage = ? WHERE mt20id = ?`;
  let params = [
    manage_id,
    mt10id,
    prfnm,
    prfpdfrom,
    prfpdto,
    prfruntime,
    pcseguidance,
    genrenm,
    prfstate,
    updatedate,
    poster,
    styurl,
    dtguidance,
    post,
    prfage,
    mt20id,
  ];

  console.log(sql);
  new Promise((resolve, reject) => {
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
};

// performance add
const addPerformance = (
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
  updatedate,
  poster,
  styurl,
  dtguidance,
  post,
  prfage
) => {
  try {
    const sql = `INSERT INTO PERFORMANCE VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let params = [
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
      updatedate,
      poster,
      styurl,
      dtguidance,
      post,
      prfage,
    ];

    console.log(params);

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

module.exports = {
  performanceList,
  deletePerformance,
  addPerformance,
  editPerformance,
};
