const express = require("express");
const router = express.Router();
const reservation = require("../../controllers/reservationController");

router.get("/reservationList", reservation.reservationList);

router.post("/", reservation.postReservation);

router.post("/member", resservation.memberInfo);

router.delete("/cancel", reservation.cancelReservation);

module.exports = router;
