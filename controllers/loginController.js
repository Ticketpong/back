const loginService = require("../service/loginService");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const options = JSON.parse(process.env.OPTIONS);

// POST login
// 로그인 처리
const memberLogin = async (req, res, next) => {
  let { id, pw } = req.body;
  try {
    let result = await loginService.memberLogin(id, pw);
    console.log(result);
    if (result) {
      const isLogined = true;
      const token = jwt.sign({ id, isLogined }, secretKey, options);
      res.status(200).json({ token, isLogined, message: "login success" });
    } else if (result === false) {
      res.status(200).json("login failed");
    } else {
      res
        .status(400)
        .send("login failed. 아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("login failed");
  }
};

// GET login
// 로그인 페이지 렌더링
const getLogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // 헤더에서 토큰 추출
  try {
    const decoded = jwt.verify(token, secretKey); // 토큰 검증
    res.status(200).json({ id: decoded.id, isLogined: decoded.isLogined });
  } catch (error) {
    res.status(401).json({ message: "로그인이 필요합니다." });
  }
};

// Get logout
// 로그아웃 처리
const getLogout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ isLogined: false });
  } catch (error) {
    console.log(error);
    res.status(500).send("logout failed");
  }
};

//post manageLogin
const postManageLogin = async (req, res, next) => {
  let { id, pw } = req.body;
  try {
    let result = await loginService.manageLogin(id, pw);
    if (result === true) {
      const isLogined = true;
      const token = jwt.sign({ id, isLogined }, secretKey, options);
      res.status(200).json({ token, isLogined, message: "login success" });
    } else if (result === false) {
      res.status(200).json("login failed");
    } else {
      res
        .status(400)
        .send("login failed. 아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("login failed");
  }
};

//get manageLogin
const getManageLogin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // 헤더에서 토큰 추출
  try {
    const decoded = jwt.verify(token, secretKey); // 토큰 검증
    res.status(200).json({ id: decoded.id, isLogined: decoded.isLogined });
  } catch (error) {
    res.status(401).json({ message: "로그인이 필요합니다." });
  }
};

//get mangeLogout
const getManageLogout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ isLogined: false });
  } catch (error) {
    console.log(error);
    res.status(500).send("logout failed");
  }
};

module.exports = {
  memberLogin,
  getLogin,
  getLogout,
  getManageLogin,
  postManageLogin,
  getManageLogout,
};
