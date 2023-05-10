import { useEffect, useState } from "react";
import { getReviewsByUserId } from "../../modules/reviewManager";
import { me } from "../../modules/authManager";
import ReviewCard from "./ReviewCard";
import { getAllResources } from "../../modules/resourceManager";

const ReviewUserList = () => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    me().then(setUser);
    getAllResources().then(setResources);
  }, []);

  useEffect(() => {
    if (user.id) {
      getReviewsByUserId(user.id).then(setReviews);
    }
  }, [user]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h2 className="m-4">Your reviews</h2>
      <div className="w-50">
        {reviews.map((review) => (
          <div key={review.id}>
            {
              resources.find((resource) => resource.id === review.resourceId)
                ?.name
            }
            <ReviewCard
              key={review.id}
              review={review}
              user={user}
              setReviews={setReviews}
              getWhicheverReviews={getReviewsByUserId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewUserList;
