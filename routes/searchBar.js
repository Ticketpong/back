const express = require("express");
const router = express.Router();
const searchBar = require("../controllers/searchBarController");

// 검색창 (http://localhost:8080/searchBar)
router.get("/", searchBar.search);

module.exports = router;
