const searchBarService = require("../service/searchBarService");

// 검색창
const search = async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await searchBarService.search(keyword);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("search failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { search };
