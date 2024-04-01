const dbconn = require("../config/mariadb");

const createReview = async (reviewData) => {
  try {
    const newReview = await Review.create(reviewData);
    return newReview;
  } catch (error) {
    throw new Error("Could not create review");
  }
};

module.exports = { createReview };
