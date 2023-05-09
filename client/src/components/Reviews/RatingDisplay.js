import { useEffect, useState } from "react";

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
    <div className="mb-3">
      <h5 className="text-center">
        {rating}/5 stars, {reviews.length} ratings
      </h5>
    </div>
  );
};

export default RatingDisplay;
