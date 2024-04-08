const express = require("express");
const router = express.Router();
const homepage = require("../../controllers/homepageController");

// Get 최신순 으로 8개의 공연을 가져옴
router.get("/recent", homepage.recentPerformance);

// Get 인기순으로 8개의 공연을 가져옴
router.get("/ranking", homepage.ranking);

// get review list
router.get("/review", homepage.reviewList);

module.exports = router;
