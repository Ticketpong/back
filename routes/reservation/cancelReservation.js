const express = require("express");
const router = express.Router();
const reservation = require("../../controllers/reservationController");

router.get("/", reservation.cancelReservation);

module.exports = router;
