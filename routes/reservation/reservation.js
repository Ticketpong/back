const express = require("express");
const router = express.Router();
const reservation = require("../../controllers/reservationController");

router.get("/", reservation.getReservation);

router.get("/", reservation.getReservation);

router.post("/reservation", reservation.postReservation);

module.exports = router;
