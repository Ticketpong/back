const performanceService = require("../service/performanceService");

// performance get list
const getPerformanceList = async (req, res) => {
  try {
    const result = await performanceService.performanceList();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// performance edit
const editPerformance = async (req, res) => {
  let {
    mt20id,
    manage_id,
    mt10id,
    prfnm,
    prfpdfrom,
    prfpdto,
    prfruntime,
    pcseguidance,
    genrenm,
    prfstate,
    updatedate,
    poster,
    styurl,
    dtguidance,
    post,
    prfage,
  } = req.body;
  try {
    const result = await performanceService.editPerformance(
      mt20id,
      manage_id,
      mt10id,
      prfnm,
      prfpdfrom,
      prfpdto,
      prfruntime,
      pcseguidance,
      genrenm,
      prfstate,
      updatedate,
      poster,
      styurl,
      dtguidance,
      post,
      prfage
    );
    if (result) {
      res.status(200).send("edit success");
    } else {
      res.status(400).send("edit failed");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// performance delete
const deletePerformance = async (req, res) => {
  const { mt20id } = req.body;
  try {
    const result = await performanceService.deletePerformance(mt20id);
    console.log(result);
    if (result) {
      res.status(200).send("delete success");
    } else {
      res.status(400).send("delete failed");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//addPerformance
const addPerformance = async (req, res) => {
  let {
    mt20id,
    manage_id,
    mt10id,
    prfnm,
    prfpdfrom,
    prfpdto,
    prfruntime,
    pcseguidance,
    genrenm,
    prfstate,
    updatedate,
    poster,
    styurl,
    dtguidance,
    post,
    prfage,
  } = req.body;
  try {
    const result = await performanceService.addPerformance(
      mt20id,
      manage_id,
      mt10id,
      prfnm,
      prfpdfrom,
      prfpdto,
      prfruntime,
      pcseguidance,
      genrenm,
      prfstate,
      updatedate,
      poster,
      styurl,
      dtguidance,
      post,
      prfage
    );
    if (result) {
      res.status(200).send("add success");
    } else {
      res.status(400).send("add failed");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getPerformanceList,
  editPerformance,
  deletePerformance,
  addPerformance,
};
