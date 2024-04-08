const express = require("express");
const router = express.Router();
const reservation = require("../../controllers/reservationController");

router.get("/reservationList", reservation.reservationList);

router.post("/", reservation.postReservation);

router.get("/member", reservation.memberInfo);

router.delete("/cancel", reservation.cancelReservation);

module.exports = router;
