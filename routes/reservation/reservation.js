const express = require("express");
const router = express.Router();
const reservation = require("../../controllers/reservationController");

// 예약 리스트
router.post("/list", reservation.reservationList);

// 예약
router.post("/", reservation.postReservation);

// 할인카드
router.post("/discount", reservation.discountCard);

// 회원정보
router.post("/member", reservation.memberInfo);

// 예약 취소
router.put("/cancel", reservation.cancelReservation);

module.exports = router;
