const signupService = require("../service/signupService");

// POST signup(member)
// 회원가입 처리
const memberSignup = async (req, res, next) => {
  let { id, pw, repw, name, phone, email, address, detailAddress } = req.body;

  try {
    if (pw !== repw) {
      return res
        .status(400)
        .send("signup failed. 비밀번호가 일치하지 않습니다.");
    }

    let result = await signupService.memberSignup(
      id,
      pw,
      name,
      phone,
      email,
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
  let { id, password, repassword, name, phone, role, part } = req.body;
  if (password !== repassword) {
    res.status(400).send("비밀번호가 일치하지 않습니다.");
  }
  try {
    let result = await signupService.manageAdd(
      id, // 아이디
      password, // 비밀번호
      name, // 이름
      phone, // 전화번호
      role, // 권한
      part // 직급
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

// get id check
const idCheck = async (req, res, next) => {
  let { id } = req.body;
  try {
    let result = await signupService.idCheck(id);
    if (result) {
      res.status(200).send("사용 가능한 아이디입니다.");
    } else {
      res.status(400).send("이미 사용중인 아이디입니다.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// get email check
const emailCheck = async (req, res, next) => {
  let { email } = req.body;
  try {
    let result = await signupService.emailCheck(email);
    if (result) {
      res.status(200).send("사용 가능한 이메일입니다.");
    } else {
      res.status(400).send("이미 사용중인 이메일입니다.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  memberSignup,
  getSignup,
  getManageSignup,
  manageAdd,
  idCheck,
  emailCheck,
};
