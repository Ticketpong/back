const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewService');

router.post('/', async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
