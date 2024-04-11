const memberService = require("../service/infoService");
const manageService = require("../service/infoService");

// member postmain page
const postMember = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await memberService.postMember(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("member main post failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("member main post failed");
  }
};

// post member Pwcheck
const postMemberPwCheck = async (req, res) => {
  const { id, pw } = req.body;
  try {
    const result = await memberService.postMemberPwCheck(id, pw);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("member main post failed");
  }
};

//member List page
const getMemeberList = async (req, res) => {
  try {
    const member = await memberService.memeberList();
    console.log(member);
    res.status(200).json(member);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// member edit page
const editMember = async (req, res) => {
  let { id, pw, repw, email, address, detailAddress } = req.body;
  try {
    if (pw !== repw) {
      res.status(400).send("password is not same");
    } else if (pw === "" && repw === "") {
      const result = await memberService.noPwEditMember(
        id,
        email,
        address,
        detailAddress
      );
      if (result) {
        res.status(200).send("member edit success");
      } else {
        res.status(400).send("member edit failed");
      }
    } else {
      const result = await memberService.editMember(
        id,
        pw,
        email,
        address,
        detailAddress
      );
      if (result) {
        res.status(200).send("member pwedit success");
      } else {
        res.status(400).send("member pwedit failed");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("member main update failed");
  }
};

// member delete page
const deleteMember = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await memberService.deleteMember(id);
    console.log(result);
    res.status(200).send("member main delete success");
  } catch (error) {
    console.log(error);
    res.status(400).send("member main delete failed");
  }
};

// manage get List
const getManageList = async (req, res) => {
  try {
    const member = await manageService.manageList();
    console.log(member);
    res.status(200).json(member);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage get edit
const getManageProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const member = await manageService.getManageProfile(id);
    console.log(member);
    res.status(200).json(member);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage edit page
const editManage = async (req, res) => {
  let { id, pw, repw, phone, auth, part } = req.body;
  try {
    if (pw !== repw) {
      res.status(400).send("password is not same");
    } else if (pw === "" && repw === "") {
      const result = await manageService.editManage(id, phone, auth, part);
      if (result) {
        res.status(200).send("manage edit success");
      } else {
        res.status(400).send("manage edit failed");
      }
    } else {
      const result = await manageService.pwEditManage(
        id,
        pw,
        phone,
        auth,
        part
      );
      if (result) {
        res.status(200).send("manage pwedit success");
      } else {
        res.status(400).send("manage pwedit failed");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage delete page
const deleteManage = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const result = await manageService.deleteManage(id);
    console.log(result);
    res.status(200).send("manage delete success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  postMember,
  postMemberPwCheck,
  getMemeberList,
  editMember,
  deleteMember,
  getManageList,
  getManageProfile,
  editManage,
  deleteManage,
};
