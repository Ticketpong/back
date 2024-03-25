const signupService = require("../service/signupService");

// POST signup(member)
// 회원가입 처리
const memberSignup = async (req, res, next) => {
  let {
    userid,
    username,
    password,
    repassword,
    useremail,
    userphone,
    address,
    detailAddress,
  } = req.body;

  try {
    if (password !== repassword) {
      return res
        .status(400)
        .send("signup failed. 비밀번호가 일치하지 않습니다.");
    }

    let result = await signupService.memberSignup(
      userid,
      username,
      password,
      useremail,
      userphone,
      address,
      detailAddress
    );

    if (result) {
      res.status(200).send("signup success");
    } else {
      res.status(400).send("signup failed");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("signup failed");
  }
};

// GET signup(member)
// 회원가입 페이지 렌더링
const getSignup = (req, res, next) => {
  res.status(200).send("signup success");
};

// GET signup(manage)
// 관리자 추가 페이지 렌더링
const getManageSignup = (req, res, next) => {
  res.status(200).send("manageAdd success");
};

// POST signup(manage)
// 관리자 추가 처리
const manageAdd = async (req, res, next) => {
  let { id, name, password, repassword, phone, role, part } = req.body;
  if (password !== repassword) {
    res.status(400).send("비밀번호가 일치하지 않습니다.");
  }
  try {
    let result = await signupService.manageAdd(
      id,
      name,
      password,
      phone,
      role,
      part
    );

    if (result) {
      res.status(200).send("관리자 추가 성공");
    } else {
      res.status(400).send("관리자 추가 실패");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("관리자 추가 실패");
  }
};

module.exports = { memberSignup, getSignup, getManageSignup, manageAdd };
