const reservationService = require("../service/reservationService");

// GET reservation
// 예약 페이지 렌더링
const reservationList = async (req, res, next) => {
  try {
    let result = await reservationService.reservationList();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("reservation rendering failed");
  }
};

// post memberInfo
// 예약자 정보
const memberInfo = async (req, res, next) => {
  let { user_id } = req.body;
  console.log(user_id);
  try {
    let result = await reservationService.memberInfo(user_id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("member info failed");
  }
};

// POST reservation
// 예약 처리
const postReservation = async (req, res, next) => {
  try {
    let {
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
      people,
    } = req.body;
    let result = await reservationService.postReservation(
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
    );
    if (result) {
      res.status(200).send("reservation success");
    } else {
      res.status(400).send("reservation failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("reservation failed");
  }
};

const cancelReservation = (req, res, next) => {
  try {
    let { imp_uid } = req.body;
    let result = reservationService.cancelReservation(imp_uid);
    if (result) {
      res.status(200).send("cancel success");
    } else {
      res.status(400).send("cancel failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("cancel failed");
  }
};

module.exports = {
  reservationList,
  memberInfo,
  postReservation,
  cancelReservation,
};
