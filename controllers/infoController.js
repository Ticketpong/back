const memberService = require("../service/infoService");
const manageService = require("../service/infoService");

// member main page
const getMemberMain = async (req, res) => {
  try {
    res.status(200).json({
      title: "member main",
      usernamd: req.session.userId,
      isLogined: req.session.isLogined,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// member edit page
const editMember = async (req, res) => {
  try {
    const { id, pw, repw, email, phone, address, detailAddress } = req.body;
    if (pw !== repw) {
      res.status(400).send("password is not same");
    } else {
      const result = await memberService.editMember(
        id,
        pw,
        email,
        phone,
        address,
        detailAddress
      );
      console.log(result);
      res.status(200).send("member main update success");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("member main update failed");
  }
};

// member delete page
const deleteMember = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await memberService.deleteMember(id);
    console.log(result);
    res.status(200).send("member main delete success");
  } catch (error) {
    console.log(error);
    res.status(400).send("member main delete failed");
  }
};

// manage get detail
const getManageDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await manageService.manageDetail(id);
    console.log(member);
    res.status(200).json(member);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage edit page
const editManage = async (req, res) => {
  try {
    const { id, pw, repw, phone, auth, part } = req.body;
    if (pw !== repw) {
      res.status(400).send("password is not same");
    } else {
      const result = await manageService.firstEditManage(
        id,
        pw,
        phone,
        auth,
        part
      );
      console.log(result);
      res.status(200).send("manage edit success");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// manage delete page
const deleteManage = (req, res) => {
  try {
    const { id } = req.body;
    const result = manageService.deleteManage(id);
    console.log(result);
    res.status(200).send("manage delete success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getMemberMain,
  editMember,
  deleteMember,
  getManageDetail,
  editManage,
  deleteManage,
};
