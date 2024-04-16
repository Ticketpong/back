const reviewService = require("../service/reviewService");

// 리뷰 저장
const create = async (req, res) => {
  const { imp_uid, pre_id, pretitle, precontent, prestar } = req.body;
  try {
    const result = await reviewService.create(
      imp_uid,
      pre_id,
      pretitle,
      precontent,
      prestar
    );
    if (result) {
      res.status(200).send("review create success");
    } else {
      res.status(400).send("review create failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// 리뷰 수정
const update = async (req, res) => {
  const { pre_id, pretitle, precontent, prestar } = req.body;
  try {
    const result = await reviewService.update(
      pre_id,
      pretitle,
      precontent,
      prestar
    );
    if (result) {
      res.status(200).send("review update success");
    } else {
      res.status(400).send("review update failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// 리뷰 삭제
const deleteReview = async (req, res) => {
  const { pre_id } = req.body;

  console.log(pre_id);
  try {
    const result = await reviewService.deleteReview(pre_id);
    if (result) {
      res.status(200).send("review delete success");
    } else if (result === false) {
      res.status(200).send("review delete failed");
    } else {
      res.status(400).send("review delete failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

//추천 여부 확인
const checkRecommand = async (req, res) => {
  const { pre_id, user_id } = req.body;
  try {
    const result = await reviewService.checkRecommand(pre_id, user_id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send("check recommand failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// 추천 표시 확인
const recommandState = async (req, res) => {
  const { pre_id, user_id } = req.body;
  try {
    const result = await reviewService.recommandState(pre_id, user_id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("check recommand failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// review 상세보기
const reviewDetail = async (req, res) => {
  const { pre_id } = req.body;
  try {
    const result = await reviewService.reviewDetail(pre_id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("get review detail failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// getReviewList(최신순으로 정렬)
const recentList = async (req, res) => {
  try {
    const result = await reviewService.recentList();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("get review list failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// getReviewList(벌점 + 추천순으로 정렬)
const recommandList = async (req, res) => {
  try {
    const result = await reviewService.recommandList();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("get review list failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// myReviewList(내가 쓴 리뷰만 보기, 최신순으로 정렬)
const myReviewList = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await reviewService.myReviewList(user_id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("get my review list failed");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create,
  update,
  deleteReview,
  checkRecommand,
  recommandState,
  recentList,
  recommandList,
  myReviewList,
  reviewDetail,
};
