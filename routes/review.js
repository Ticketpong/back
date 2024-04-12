const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");

// 리뷰 저장 (http://localhost:8080/review)
router.post("/", review.create);

// 리뷰 수정 (http://localhost:8080/review/edit)
router.put("/edit", review.update);

// 리뷰 삭제 (http://localhost:8080/review/delete)
router.delete("/delete", review.deleteReview);

// 리뷰 추천 (http://localhost:8080/review/recommand)
router.put("/recommand", review.recommand);

// 리뷰 추천취소 (http://localhost:8080/review/recommandCancel)
router.put("/recommandCancel", review.cancelRecommand);

// 리뷰 최신순으로 리스트 가져오기 (http://localhost:8080/review/recentList)
router.get("/recentList", review.recentList);

// 리뷰 벌점 + 추천순으로 리스트 가져오기 (http://localhost:8080/review/recommandList)
router.get("/recommandList", review.recommandList);

// 내가 쓴 리뷰만 보기 (http://localhost:8080/review/myReviewList)
router.post("/myReviewList", review.myReviewList);

// 리뷰 상세보기 (http://localhost:8080/review/detail)
router.post("/detail", review.reviewDetail);

module.exports = router;
