import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviewsByResourceId } from "../../modules/reviewManager";
import ReviewCard from "./ReviewCard";
import { getResource } from "../../modules/resourceManager";
import RatingDisplay from "./RatingDisplay";
import { me } from "../../modules/authManager";

const ReviewsList = () => {
  const { resourceId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [resource, setResource] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    me().then(setUser);
  }, []);

  useEffect(() => {
    if (resourceId) {
      getResource(resourceId).then(setResource);

      getReviewsByResourceId(resourceId).then((reviews) => {
        reviews.sort((a, b) => {
          if (a.userId === user.id) {
            return -1;
          }
          return 0;
        });
        setReviews(reviews);
      });
    }
  }, [user]);

  return (
    <div className="m-3">
      <h4 className="text-center">All reviews for</h4>
      <Link className="clean-link" to={`/resources/details/${resource.id}`}>
        <h2 className="text-center">{resource.name}</h2>
      </Link>
      <RatingDisplay reviews={reviews} />
      {reviews.map((review) => (
        <div key={review.id} className="w-75 d-flex flex-column mx-auto">
          <ReviewCard
            resourceId={resourceId}
            review={review}
            user={user}
            setReviews={setReviews}
            getWhicheverReviews={getReviewsByResourceId}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
