const macAddressService = require("../service/macAddressService");

// macAddress 저장
const create = async (req, res) => {
  const { device_id, user_id, device_name } = req.body;
  try {
    const result = await macAddressService.create(
      device_id,
      user_id,
      device_name
    );
    if (result) {
      res.status(200).send("macAddress create success");
    } else {
      res.status(400).send("macAddress create failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// macAddress 가져오기
const get = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await macAddressService.get(user_id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send("macAddress get failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// macAddress 수정
const update = async (req, res) => {
  const { device_id, device_name } = req.body;
  try {
    const result = await macAddressService.update(device_id, device_name);
    if (result) {
      res.status(200).send("macAddress update success");
    } else {
      res.status(400).send("macAddress update failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create,
  get,
  update,
};
