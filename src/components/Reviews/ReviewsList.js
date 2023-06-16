import "./Reviews.css";
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
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    me().then(setUser);
  }, []);

  useEffect(() => {
    if (sortBy === "likes") {
      const sortedReviews = [...reviews].sort(
        (a, b) => b.reviewLikes.length - a.reviewLikes.length
      );
      setReviews(sortedReviews);
    } else if (sortBy === "recent") {
      const sortedReviews = [...reviews].sort((a, b) => {
        return b.id - a.id;
      });
    } else if (sortBy === "high") {
      const sortedReviews = [...reviews].sort((a, b) => {
        return b.reviewScore - a.reviewScore;
      });
      setReviews(sortedReviews);
    } else if (sortBy === "low") {
      const sortedReviews = [...reviews].sort((a, b) => {
        return a.reviewScore - b.reviewScore;
      });
      setReviews(sortedReviews);
    }
  }, [sortBy]);

  useEffect(() => {
    if (resourceId) {
      getResource(resourceId).then(setResource);
      getReviewsByResourceId(resourceId).then((fetchedReviews) => {
        fetchedReviews.sort((a, b) => {
          return b.id - a.id;
        });
        fetchedReviews.sort((a, b) => {
          if (a.userId === user.id) {
            return -1;
          }
          return 0;
        });
        setReviews(fetchedReviews);
      });
    }
  }, [user]);

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="m-3">
      <h4 className="text-center">All reviews for</h4>
      <Link className="clean-link" to={`/resources/details/${resource.id}`}>
        <h2 className="text-center">{resource.name}</h2>
      </Link>
      <RatingDisplay reviews={reviews} />
      <div className="w-72 mx-auto">
        <div>Filter reviews by:</div>
        <select onChange={handleSort}>
          <option value="recent">Most recent</option>
          <option value="likes">Most liked</option>
          <option value="high">Highest rating</option>
          <option value="low">Lowest rating</option>
        </select>
      </div>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="max-width-500 d-flex flex-column mx-auto"
        >
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
