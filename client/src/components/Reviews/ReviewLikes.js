import "./Reviews.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  addReviewLike,
  getReviewLikesByReviewId,
} from "../../modules/reviewManager";

function ReviewLikes({ userId, reviewId }) {
  const [reviewLikes, setReviewLikes] = useState([]);
  useEffect(() => {
    getReviewLikesByReviewId(reviewId).then(setReviewLikes);
  }, [reviewId]);

  useEffect(() => {
    console.log(reviewLikes);
  }, [reviewLikes]);

  const handleLike = (event) => {
    const reviewLike = {
      userId: userId,
      reviewId: reviewId,
    };
    console.log(reviewLike);
    addReviewLike(reviewLike).then(() => {
      getReviewLikesByReviewId(reviewId).then(setReviewLikes);
    });
  };

  const length = reviewLikes.length;

  return (
    <div className="d-flex align-items-center">
      <button className="border-none white-background" onClick={handleLike}>
        <FontAwesomeIcon icon={faThumbsUp} className="unliked-thumb" />
      </button>
      <div className="d-inline">
        {length} {length === 1 ? "user likes" : "users like"} this review
      </div>
    </div>
  );
}

export default ReviewLikes;
