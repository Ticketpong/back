const { Review } = require('../models');

class ReviewService {
  async createReview(reviewData) {
    try {
      const newReview = await Review.create(reviewData);
      return newReview;
    } catch (error) {
      throw new Error('Could not create review');
    }
  }
}

module.exports = new ReviewService();
