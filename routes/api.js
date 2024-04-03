const express = require("express");
const router = express.Router();
const {
  getHallDetail,
  getPerformanceDetail,
  getResData,
} = require("../controllers/apiController");

// get 공연시설 상세정보
router.get("/hallDetail", getHallDetail);

//get 공연 상세정보
router.get("/performanceDetail", getPerformanceDetail);

/// 예매상황판 정보 저장 라우트
router.get("/saveBoxOffice", getResData);

module.exports = router;
