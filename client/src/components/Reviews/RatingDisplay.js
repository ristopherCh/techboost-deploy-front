import { useEffect, useState } from "react";
import StarRating from "../StarRating";

const RatingDisplay = ({ reviews }) => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    setRating(
      (
        reviews.reduce(
          (accumulator, currentValue) => accumulator + currentValue.reviewScore,
          0
        ) / reviews.length
      ).toFixed(1)
    );
  }, [reviews]);

  return (
    <div className="mb-3 d-flex justify-content-center">
      <StarRating rating={rating} />
      <h5 className="text-center ms-2">{reviews.length} ratings</h5>
    </div>
  );
};

export default RatingDisplay;
