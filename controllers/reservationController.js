const reservationService = require("../service/reservationService");

// GET reservation
// 예약 페이지 렌더링
const getReservation = async (req, res, next) => {
  try {
    let result = await reservationService.getReservation();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("reservation rendering failed");
  }
};

// POST reservation
// 예약 처리
const postReservation = async (req, res, next) => {
  try {
    let {
      userId,
      res_date,
      date,
      time,
      people,
      success,
      selectseat,
      watchstate,
      prestate,
      paid,
    } = req.body;
    let result = await reservationService.postReservation(
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

module.exports = { getReservation, postReservation, cancelReservation };
