const express = require('express');
const router = express.Router();
const { saveShowData, saveBoxoffice } = require('../controller/apiController');

// '/getPerformancesData' 경로로 GET 요청을 받을 때 두 함수를 병렬로 실행합니다.
router.get('/getPerformancesData', (req, res) => {
  Promise.all([saveShowData() , saveBoxoffice()])
    .then(() => {
      res.status(200).send('Data saved successfully.');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error occurred while saving data.');
    });
    console.log("enddddddddddddddddddddd")
});

module.exports = router;