const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");

// 리뷰 저장 (http://localhost:8080/review)
router.post("/", review.create);

// 리뷰 수정 (http://localhost:8080/review/edit)
router.put("/edit", review.update);

// 리뷰 삭제 (http://localhost:8080/review/delete)
router.post("/delete", review.deleteReview);

// 추천 확인 (http://localhost:8080/review/checkRecommand)
router.post("/checkRecommand", review.checkRecommand);

// 추천 표시 확인 (http://localhost:8080/review/recommand)
router.post("/recommand", review.recommandState);

// 리뷰 최신순으로 리스트 가져오기 (http://localhost:8080/review/recentList)
router.get("/recentList", review.recentList);

// 리뷰 벌점 + 추천순으로 리스트 가져오기 (http://localhost:8080/review/recommandList)
router.get("/recommandList", review.recommandList);

// 내가 쓴 리뷰만 보기 (http://localhost:8080/review/myReviewList)
router.post("/myReviewList", review.myReviewList);

// 리뷰 상세보기 (http://localhost:8080/review/detail)
router.post("/detail", review.reviewDetail);

module.exports = router;
