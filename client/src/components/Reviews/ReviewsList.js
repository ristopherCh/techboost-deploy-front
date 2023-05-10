import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByResourceId } from "../../modules/reviewManager";
import ReviewCard from "./ReviewCard";
import { getResource } from "../../modules/resourceManager";
import RatingDisplay from "./RatingDisplay";
import { me } from "../../modules/authManager";

const ReviewsList = () => {
  const { resourceId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [resource, setResource] = useState({});
  const [rating, setRating] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    me().then(setUser);
  }, []);

  useEffect(() => {
    if (resourceId) {
      getResource(resourceId).then(setResource);

      getReviewsByResourceId(resourceId).then((reviews) => {
        setReviews(reviews);
        setRating(
          (
            reviews.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.reviewScore,
              0
            ) / reviews.length
          ).toFixed(1)
        );
      });
    }
  }, [resourceId]);

  return (
    <div className="m-3">
      <h4 className="text-center">All reviews for</h4>
      <h2 className="text-center">{resource.name}</h2>
      <RatingDisplay reviews={reviews} />
      {reviews.map((review) => (
        <div key={review.id} className="w-75 d-flex flex-column mx-auto">
          <ReviewCard resourceId={resourceId} review={review} user={user} setReviews={setReviews} getWhicheverReviews={getReviewsByResourceId} />
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
