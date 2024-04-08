const findService = require("../service/findIdPasswordService");

// POST findId
// 아이디 찾기
const findId = async (req, res, next) => {
  let { name, email } = req.body;
  try {
    let result = await findService.findId(name, email);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("일치하는 정보가 없습니다.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("findId failed");
  }
};

// POST findPassword
// 비밀번호 임시비밀번호 발급
const findPassword = async (req, res, next) => {
  let { name, id, email } = req.body;
  try {
    let result = await findService.findPassword(name, id, email);
    if (result) {
      res
        .status(200)
        .json("임시비밀번호가 발급되었습니다. 이메일을 확인해주세요.");
    } else {
      res.status(400).send("일치하는 정보가 없습니다.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("findPassword failed");
  }
};

module.exports = { findId, findPassword };
