const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");

router.post("/", review.createReview);

module.exports = router;
