const express = require("express");
const router = express.Router();
const reservation = require("../../controllers/reservationController");

router.get("/", reservation.reservationList);

router.post("/reservation", reservation.postReservation);

router.post("/cancel", reservation.cancelReservation);

module.exports = router;
