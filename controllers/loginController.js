const loginService = require("../service/loginService");

// POST login
// 로그인 처리
const memberLogin = async (req, res, next) => {
  let { id, pw } = req.body;
  try {
    let result = await loginService.memberLogin(id, pw);
    console.log(result);
    if (result) {
      req.session.userId = id;
      req.session.isLogined = true;
      req.session.save();
      res.status(200).send("login success");
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
const getLogin = (req, res, next) => {
  const { userId, isLogined } = req.session;
  if (isLogined) {
    res.status(200).json({ userId, isLogined });
  }
  res.status(400).send("login failed");
};

// Get logout
// 로그아웃 처리
const getLogout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("logout failed");
      }
      return res.status(200).json({ isLogined: false });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("logout failed");
  }
};

//get manageLogin
const getManageLogin = (req, res, next) => {
  const { manageId, isLogined } = req.session;
  if (isLogined) {
    res.status(200).json({ manageId, isLogined });
  }
  res.status(400).send("login failed");
};

//post manageLogin
const postManageLogin = async (req, res, next) => {
  let { id, pw } = req.body;
  try {
    let result = await loginService.manageLogin(id, pw);
    if (result) {
      req.session.manageId = id;
      req.session.isLogined = true;
      req.session.save();
      res.status(200).send("login success");
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

//get mangeLogout
const getManageLogout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("logout failed");
      }
      return res.status(200).json({ isLogined });
    });
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
