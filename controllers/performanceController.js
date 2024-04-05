const performanceService = require("../service/performanceService");

const getPerformanceList = async (req, res) => {
  try {
    const result = await performanceService.performanceList();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const editPerformance = async (req, res) => {
  try {
    const result = await performanceService.editPerformance(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePerformance = async (req, res) => {
  const { mt20id } = req.body;
  try {
    const result = await performanceService.deletePerformance(mt20id);
    console.log(result);
    res.status(200).json("delete success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPerformance = async (req, res) => {
  try {
    const result = await performanceService.addPerformance(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPerformanceList,
  editPerformance,
  deletePerformance,
  addPerformance,
};
