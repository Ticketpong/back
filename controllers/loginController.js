const loginService = require("../service/loginService");

// POST login
// 로그인 처리
const memberLogin = async (req, res, next) => {
  let { id, pw } = req.body;
  try {
    let result = await loginService.memberLogin(id, pw);
    console.log(result);
    if (result) {
      res.cookie("userId", id, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      req.session.userId = id;
      req.session.isLogined = true;
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
  res.status(200).send("login success");
};

// Get logout
// 로그아웃 처리
const getLogout = (req, res, next) => {
  try {
    delete req.session.userId;
    delete req.session.isLogined;
    res.clearCookie("userId");
    res.status(200).send("logout success");
  } catch (error) {
    console.log(error);
    res.status(500).send("logout failed");
  }
};

//get manageLogin
const getManageLogin = (req, res, next) => {
  res.status(200).send("login success");
};

//post manageLogin
const postManageLogin = async (req, res, next) => {
  let { id, pw } = req.body;
  try {
    let result = await loginService.manageLogin(id, pw);
    if (result) {
      res.cookie("userId", id, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      req.session.manageId = id;
      req.session.isLogined = true;
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
    delete req.session.manageId;
    delete req.session.isLogined;
    res.clearCookie("manageId");
    res.status(200).send("logout success");
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
