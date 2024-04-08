const viewAllService = require("../service/viewAllService");

// 5위까지 랭킹 가져오기
const ranking = async (req, res, next) => {
  try {
    const ranking = await viewAllService.ranking();
    res.status(200).json(ranking);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// 전체 공연 가져오기
const viewAll = async (req, res, next) => {
  try {
    const performances = await viewAllService.viewAll();
    res.status(200).json(performances);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { viewAll, ranking };
