const express = require("express");
const router = express.Router();
const { saveBoxOffice } = require("../service/api/saveBoxOffice");
const { savePlaceInfo } = require("../service/api/savePlaceInfo");
const { getSaveHallList } = require("../service/api/savePlaceInfo");
const { saveShowData } = require("../service/api/saveshowDetail");

// 공연 상세정보 저장 라우트
router.get("/saveShowData", async (req, res) => {
  try {
    await saveShowData(); // saveShowData 함수 호출 및 완료 대기

    // 성공적으로 작업이 완료되면 200 상태 코드와 함께 응답 보냄
    res.status(200).send("Show detail saved successfully");
  } catch (error) {
    // 에러가 발생하면 500 상태 코드와 함께 에러 메시지 응답
    console.error("Error saving show detail:", error);
    res.status(500).send("Internal server error");
  }
});

// 시설 정보 저장 라우트
router.get("/getSaveHallList", async (req, res) => {
  try {
    await getSaveHallList(); // savePlaceInfo 함수 호출 및 완료 대기

    // 성공적으로 작업이 완료되면 200 상태 코드와 함께 응답 보냄
    res.status(200).send("Place info saved successfully");
  } catch (error) {
    // 에러가 발생하면 500 상태 코드와 함께 에러 메시지 응답
    console.error("Error saving place info:", error);
    res.status(500).send("Internal server error");
  }
});


// 시설 정보 저장 라우트
router.get("/savePlaceInfo", async (req, res) => {
  try {
    await savePlaceInfo(); // savePlaceInfo 함수 호출 및 완료 대기

    // 성공적으로 작업이 완료되면 200 상태 코드와 함께 응답 보냄
    res.status(200).send("Place info saved successfully");
  } catch (error) {
    // 에러가 발생하면 500 상태 코드와 함께 에러 메시지 응답
    console.error("Error saving place info:", error);
    res.status(500).send("Internal server error");
  }
});

/// 예매상황판 정보 저장 라우트
router.get("/saveBoxOffice", async (req, res) => {
  try {
    await saveBoxOffice(); // saveBoxOffice 함수 호출 및 완료 대기

    // 성공적으로 작업이 완료되면 200 상태 코드와 함께 응답 보냄
    res.status(200).send("Box office data saved successfully");
  } catch (error) {
    // 에러가 발생하면 500 상태 코드와 함께 에러 메시지 응답
    console.error("Error saving box office data:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;