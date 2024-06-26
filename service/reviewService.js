const f = require("session-file-store");
const dbconn = require("../config/mariadb");
const crypto = require("crypto");

// 리뷰 저장
const create = async (imp_uid, pre_id, pretitle, precontent, prestar) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month 두자리로 저장
  const day = String(date.getDate()).padStart(2, "0"); // day 두자리로 저장
  const predate = `${year}-${month}-${day}`;

  const readUrl = `SELECT * FROM RESERVATION WHERE imp_uid = ?`;
  const readParams = [imp_uid];

  return new Promise((resolve, reject) => {
    dbconn.db.query(readUrl, readParams, async (err, result) => {
      if (err) {
        console.error("Error reading review:", err);
        resolve(false);
      } else {
        const newData = result[0];
        console.log(newData);
        const recommend = 0;
        const sql = `INSERT INTO REVIEW VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
          pre_id,
          imp_uid,
          newData.mt20id,
          newData.manage_id,
          newData.mt10id,
          newData.user_id,
          pretitle,
          precontent,
          predate,
          prestar,
          recommend,
        ];

        console.log(params);
        try {
          const success = await dbcons(sql, params);
          if (success) {
            const updateSuccess = await updateReservation(imp_uid);
            if (updateSuccess) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error("Error creating review:", error);
          resolve(false);
        }
      }
    });
  });
};

// prestate = true로 변경
const updateReservation = async (imp_uid) => {
  const sql = `UPDATE RESERVATION SET prestate = ? WHERE imp_uid = ?`;
  const params = [true, imp_uid];

  const updateSuccess = await dbcons(sql, params);
  if (updateSuccess) {
    return true;
  } else {
    return false;
  }
};

// 리뷰 수정
const update = async (pre_id, pretitle, precontent, prestar) => {
  const sql = `UPDATE REVIEW SET pretitle = ?, precontent = ?, prestar = ? WHERE pre_id = ?`;
  const params = [pretitle, precontent, prestar, pre_id];

  try {
    const success = await dbcons(sql, params);
    return success;
  } catch (error) {
    console.error("Error updating review:", error);
    return false;
  }
};

// 리뷰 삭제
const deleteReview = async (pre_id) => {
  const sql = `DELETE FROM RECOMMAND WHERE pre_id = ?`;
  const params = [pre_id];

  console.log(sql, params);

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, async (err, result) => {
      if (err) {
        console.error("Error reading review:", err);
        resolve(false);
      } else {
        console.log("delete recommand success");
        const sql = `SELECT imp_uid FROM REVIEW WHERE pre_id =?`;
        const params = [pre_id];
        console.log(sql, params);

        const findSuccess = await findImp_uid(sql, params);
        if (findSuccess) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

// imp_uid 찾기
const findImp_uid = async (sql, params) => {
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, async (err, result) => {
      if (err) {
        console.error("Error reading review:", err);
        resolve(false);
      } else {
        console.log(result);
        const imp_uid = result[0].imp_uid;
        console.log(imp_uid);

        const deleteSuccess = await deleteReviewData(imp_uid);
        if (deleteSuccess) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

// 리뷰 삭제
const deleteReviewData = async (imp_uid) => {
  const sql = `DELETE FROM REVIEW WHERE imp_uid = ?`;
  const params = [imp_uid];

  const success = await dbcons(sql, params);
  if (success) {
    const updateSuccess = await falsePrestate(imp_uid);
    if (updateSuccess) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// prestate = false로 변경
const falsePrestate = async (imp_uid) => {
  const sql = `UPDATE RESERVATION SET prestate = ? WHERE imp_uid = ?`;
  const params = [false, imp_uid];

  const updateSuccess = await dbcons(sql, params);
  if (updateSuccess) {
    return true;
  } else {
    return false;
  }
};

// 리뷰 추천 확인
const checkRecommand = async (pre_id, user_id) => {
  try {
    if (!user_id) {
      return "login required";
    } else {
      const sql = `SELECT * FROM RECOMMAND WHERE pre_id = ? AND user_id = ?`;
      const params = [pre_id, user_id];

      return new Promise((resolve, reject) => {
        dbconn.db.query(sql, params, async (err, result) => {
          if (err) {
            console.error("Error reading review:", err);
            resolve(false);
          } else if (result.length > 0) {
            // 추천한 상태
            const recommandCancelSuccess = await cancelRecommand(
              pre_id,
              user_id
            ); // 추천 취소
            if (recommandCancelSuccess) {
              resolve("cancel recommand success");
            } else {
              resolve(false);
            }
          } else if (result.length === 0) {
            // 추천하지 않은 상태
            const recommandSuccess = await recommand(pre_id, user_id); // 추천
            if (recommandSuccess) {
              resolve("recommand success");
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        });
      });
    }
  } catch (error) {
    console.error("Error recommand:", error);
    return false;
  }
};

// 리뷰 추천
const recommand = async (pre_id, user_id) => {
  const sql = `SELECT * FROM REVIEW WHERE pre_id = ?`;
  const params = [pre_id];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, async (err, result) => {
      if (err) {
        console.error("Error reading review:", err);
        resolve(false);
      } else {
        const recommand = result[0];
        const recommand_id = crypto.randomBytes(16).toString("hex");

        const sql = `INSERT INTO RECOMMAND VALUES (?, ?, ?, ?)`;
        const params = [recommand_id, pre_id, user_id, true];
        const success = await dbcons(sql, params);
        if (success) {
          const sql = `UPDATE REVIEW SET recommend = recommend + 1 WHERE pre_id = ?`;
          const params = [pre_id];

          const success = await dbcons(sql, params);
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        } else {
          reject(false);
        }
      }
    });
  });
};

// 리뷰 추천 취소
const cancelRecommand = async (pre_id, user_id) => {
  const sql = `DELETE FROM RECOMMAND WHERE user_id = ? AND pre_id = ?`;
  const params = [user_id, pre_id];

  const success = await dbcons(sql, params);
  if (success) {
    const sql = `UPDATE REVIEW SET recommend = recommend - 1 WHERE pre_id = ?`;
    const params = [pre_id];

    const success = await dbcons(sql, params);
    if (success) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// 추천 표시 확인
const recommandState = async (pre_id, user_id) => {
  const sql = `SELECT recommnad_state FROM RECOMMAND WHERE pre_id = ? AND user_id = ?`;
  const params = [pre_id, user_id];

  console.log(sql, params);

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, async (err, result) => {
      if (err) {
        console.error("Error reading review:", err);
        resolve(false);
      } else if (result.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

//review 상세보기
const reviewDetail = async (pre_id) => {
  const sql = `SELECT R.*, P.*
  FROM REVIEW R
  LEFT JOIN PERFORMANCE P ON P.mt20id = R.mt20id
  WHERE pre_id = ?`;
  const params = [pre_id];

  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error reading review:", err);
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
};

// getReviewList(최신순으로 정렬)
const recentList = async (req, res) => {
  try {
    const sql = `SELECT R.*, P.*
    FROM REVIEW R
    LEFT JOIN PERFORMANCE P ON P.mt20id = R.mt20id
    ORDER BY predate DESC`;

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, (err, result) => {
        if (err) {
          console.error("Error reading review:", err);
          resolve(false);
        } else {
          resolve(result);
        }
      });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// getReviewList(별점 + 추천순으로 정렬)
const recommandList = async (req, res) => {
  try {
    const sql = `SELECT R.*, P.*
    FROM REVIEW R
    LEFT JOIN PERFORMANCE P ON P.mt20id = R.mt20id
    ORDER BY prestar DESC , recommend DESC `;

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, (err, result) => {
        if (err) {
          console.error("Error reading review:", err);
          resolve(false);
        } else {
          resolve(result);
        }
      });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// getMyReviewList (내가 쓴 리뷰만 보기, 최신순으로 정렬)
const myReviewList = async (user_id) => {
  try {
    const sql = `SELECT R.*, P.*
    FROM REVIEW R
    LEFT JOIN PERFORMANCE P ON P.mt20id = R.mt20id
    WHERE user_id = ?
    ORDER BY predate DESC `;
    const params = [user_id];

    return new Promise((resolve, reject) => {
      dbconn.db.query(sql, params, (err, result) => {
        if (err) {
          console.error("Error reading review:", err);
          resolve(false);
        } else {
          resolve(result);
        }
      });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// db connection function
const dbcons = (sql, params) => {
  return new Promise((resolve, reject) => {
    dbconn.db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error connecting to database:", err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = {
  create,
  update,
  deleteReview,
  checkRecommand,
  recommandState,
  recentList,
  recommandList,
  myReviewList,
  reviewDetail,
};
