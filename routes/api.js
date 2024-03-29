const express = require('express');
const router = express.Router();
const { saveBoxOffice } = require('../service/api/saveBoxOffice');
const { savePlaceInfo } = require('../service/api/savePlaceInfo');
const { saveShowData } = require('../service/api/saveshowDetail');

// 예매상황판 정보 저장 라우트
router.get('/saveBoxOffice', (req, res) => {
  saveBoxOffice()
    .then(() => {
      res.status(200).send('Box office data saved successfully');
    })
    .catch((error) => {
      console.error('Error saving box office data:', error);
      res.status(500).send('Internal server error');
    });
});

//// 시설 정보 저장 라우트
router.get('/savePlaceInfo', (req, res) => {
  savePlaceInfo()
    .then(() => {
      res.status(200).send('Place info saved successfully');
    })
    .catch((error) => {
      console.error('Error saving place info:', error);
      res.status(500).send('Internal server error');
    });
});

// 공연 상세정보 저장 라우트
router.get('/saveShowData', (req, res) => {
  saveShowData()
    .then(() => {
      res.status(200).send('Show detail saved successfully');
    })
    .catch((error) => {
      console.error('Error saving show detail:', error);
      res.status(500).send('Internal server error');
    });
});

module.exports = router;
