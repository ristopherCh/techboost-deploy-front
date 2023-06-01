import "./Reviews.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import {
  addReviewLike,
  deleteReviewLike,
  getReviewLikesByReviewId,
} from "../../modules/reviewManager";

function ReviewLikes({ userId, reviewId }) {
  const [reviewLikes, setReviewLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    let foundReview = reviewLikes.find((like) => {
      return like.userId === userId && like.reviewId === reviewId;
    });
    if (foundReview) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [reviewLikes]);

  useEffect(() => {
    getReviewLikesByReviewId(reviewId).then(setReviewLikes);
  }, [reviewId]);

  const handleLike = (event) => {
    const reviewLike = {
      userId: userId,
      reviewId: reviewId,
    };
    let foundReview = reviewLikes.find((like) => {
      return (
        like.userId === reviewLike.userId &&
        like.reviewId === reviewLike.reviewId
      );
    });
    if (!foundReview) {
      addReviewLike(reviewLike).then(() => {
        getReviewLikesByReviewId(reviewId).then(setReviewLikes);
      });
    } else {
      deleteReviewLike(foundReview.id).then(() => {
        getReviewLikesByReviewId(reviewId).then(setReviewLikes);
      });
    }
  };

  const length = reviewLikes.length;

  return (
    <div className="d-flex align-items-center">
      <button className="border-none white-background" onClick={handleLike}>
        {hasLiked ? (
          <FontAwesomeIcon
            icon={faThumbsUpSolid}
            className="liked-thumb thumb"
          />
        ) : (
          <FontAwesomeIcon icon={faThumbsUp} className="unliked-thumb thumb" />
        )}
      </button>
      <div className="d-inline">
        {length} {length === 1 ? "user likes" : "users like"} this review
      </div>
    </div>
  );
}

export default ReviewLikes;
