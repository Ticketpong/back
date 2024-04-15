const dbconn = require("../config/mariadb");
const macaddress = require("macaddress");

const create = async (device_id, user_id, device_name) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month 두자리로 저장
  const day = String(date.getDate()).padStart(2, "0"); // day 두자리로 저장
  const res_date = `${year}-${month}-${day}`;

  console.log(device_id, user_id, device_name, res_date);

  try {
    // mac address 가져오기
    const mac = await new Promise((resolve, reject) => {
      macaddress.one((err, mac) => {
        if (err) {
          reject(err);
        } else {
          resolve(mac);
        }
      });
    });

    // mac address 저장
    const sql = `INSERT INTO DEVICES VALUES (?, ?, ?, ?, ?)`;
    const params = [device_id, user_id, device_name, mac, res_date];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, result) => {
        if (err) {
          console.error("Error inserting mac address:", err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.error("Error getting mac address:", error);
    return false;
  }
};

// macAddress 가져오기
const get = async (user_id) => {
  const sql = `SELECT * FROM DEVICES WHERE user_id = ?`;
  const params = [user_id];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error getting mac address:", err);
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
};

// macAddress 수정
const update = async (device_id, device_name) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month 두자리로 저장
  const day = String(date.getDate()).padStart(2, "0"); // day 두자리로 저장
  const res_date = `${year}-${month}-${day}`;

  try {
    // mac address 가져오기
    const mac = await new Promise((resolve, reject) => {
      macaddress.one((err, mac) => {
        if (err) {
          reject(err);
        } else {
          resolve(mac);
        }
      });
    });

    // mac address 수정
    const sql = `UPDATE DEVICES SET device_name = ?, macaddress = ?, res_date = ? WHERE device_id = ?`;
    const params = [device_name, mac, res_date, device_id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, result) => {
        if (err) {
          console.error("Error updating mac address:", err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.error("Error getting mac address:", error);
    return false;
  }
};

// 현재 사용자의 macAddress 가져오기
const getCurrent = async (user_id) => {
  try {
    // macAddress 가져오기
    const getMac = () => {
      return new Promise((resolve, reject) => {
        macaddress.one((err, mac) => {
          if (err) {
            reject(err);
          } else {
            resolve(mac);
          }
        });
      });
    };

    const mac = await getMac();

    // user_id의 저장된 mac address 가져오기
    const sql = `SELECT macaddress FROM DEVICES WHERE user_id = ?`;
    const params = [user_id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, result) => {
        if (err) {
          console.error("Error getting mac address:", err);
          resolve(false);
        } else {
          if (result.length > 0 && result[0].macaddress === mac) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  } catch (error) {
    console.error("Error getting mac address:", error);
    return false;
  }
};

module.exports = {
  create,
  get,
  update,
  getCurrent,
};
