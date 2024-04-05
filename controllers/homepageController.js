const homepageService = require("../service/homepageService");

// 최신순으로 8개의 공연을 가져옴
const recentPerformance = async (req, res, next) => {
  try {
    const newOpen = await homepageService.recentPerformance();
    res.status(200).json(newOpen);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// 인기순으로 8개의 공연을 가져옴
const ranking = async (req, res, next) => {
  try {
    const ranking = await homepageService.ranking();
    res.status(200).json(ranking);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// 리뷰 리스트를 가져옴
const reviewList = async (req, res, next) => {
  try {
    const review = await homepageService.review();
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { recentPerformance, ranking, reviewList };
