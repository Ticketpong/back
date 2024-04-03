const hallService = require("../service/api/hallService");

const getHallDetail = async (req, res) => {
  try {
    const result = await hallService.savePlaceId(); // savePlaceInfo 함수 호출 및 완료 대기
    if (result === "error") {
      // 에러가 발생한 경우 400 상태 코드와 함께 에러 메시지 응답
      res.status(400).send("Error saving place info");
    } else {
      // 성공적으로 작업이 완료되면 200 상태 코드와 함께 응답 보냄
      res.status(200).send(result);
    }
  } catch (error) {
    // 에러가 발생하면 500 상태 코드와 함께 에러 메시지 응답
    console.error("Error saving place info:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { getHallDetail };
