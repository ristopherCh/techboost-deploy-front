import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardLink } from "reactstrap";
import { getReviewsByResourceId } from "../../modules/reviewManager";
import ReviewCard from "../Reviews/ReviewCard";
import RatingDisplay from "../Reviews/RatingDisplay";

const ResourceCard = ({ resource, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (resource.id) {
      getReviewsByResourceId(resource.id).then(setReviews);
    }
  }, [resource]);

  useEffect(() => {
    for (let review of reviews) {
      if (review.userId === currentUser?.id) {
        setHasReviewed(true);
      }
    }
  }, [reviews, currentUser]);

  const handleSeeReviewsClick = () => {
    setShowReviews(!showReviews);
  };

  return (
    <Card className="m-2">
      <CardHeader className="nice-color">
        <Link className="clean-link" to={`/resources/details/${resource.id}`}>
          <h5>{resource.name}</h5>
        </Link>
      </CardHeader>
      <CardBody>
        {reviews.length !== 0 ? (
          <RatingDisplay reviews={reviews} />
        ) : (
          <h5 className="text-center mb-3">No reviews</h5>
        )}
        <div className="d-flex justify-content-around mb-2">
          <a
            type="submit"
            href={resource.resourceUrl}
            className="width-50 clean-link btn btn-sm btn-color w-25"
            target="_blank"
            rel="noreferrer noopener"
          >
            Go to resource
          </a>
          {hasReviewed ? (
            <Link
              className="width-50 clean-link btn btn-sm btn-color-3 w-25"
              to={`/resources/${resource.id}/editreview`}
            >
              Edit your review
            </Link>
          ) : (
            <Link
              className="width-50 clean-link btn btn-sm btn-color-2 w-25"
              to={`/resources/${resource.id}/addreview`}
            >
              Add a review
            </Link>
          )}
        </div>
        <strong>Media Type:</strong>{" "}
        <Link
          className="clean-link"
          to={`/resources/mediaTypes/${resource.mediaType?.name}`}
        >
          {" "}
          {resource.mediaType?.name}
        </Link>
        <div className="mt-2">
          <strong>Description</strong>
        </div>
        <div>{resource.description}</div>
        <div className="mt-2">
          <strong>Creator:</strong>{" "}
          <Link
            className="clean-link"
            to={`/resources/creators/${resource.creator}`}
          >
            {resource.creator}
          </Link>
        </div>
        <div className="mt-2">
          <strong>Price:</strong>{" "}
          {resource.price === 0 ? "Free" : `$${resource.price}`}
        </div>
        <div className="mt-2">
          {resource.subjects?.length > 0 && <strong>Subjects</strong>}
        </div>
        <ul className="list-unstyled">
          {resource.subjects?.map((subject) => (
            <Link
              key={subject.id}
              className="clean-link"
              to={`/resources/subjects/${subject.name}`}
            >
              <li>{subject.name}</li>
            </Link>
          ))}
        </ul>
        {reviews.length > 0 ? (
          <div id="reviews-box">
            {showReviews ? (
              <div>
                <h3 className="m-3">Reviews</h3>
                <div className="m-2">
                  {reviews.slice(0, 3).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
                <div className="d-flex justify-content-around">
                  <Button
                    className="btn-sm btn-color-2 border-none text-black"
                    onClick={handleSeeReviewsClick}
                  >
                    Hide reviews
                  </Button>
                  <Link
                    className="width-50 clean-link btn btn-sm btn-color-2 w-25"
                    to={`/resources/${resource.id}/allreviews`}
                  >
                    See all reviews
                  </Link>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Button
                  className="btn-sm btn-color-2 border-none text-black"
                  onClick={handleSeeReviewsClick}
                >
                  Show reviews
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </CardBody>
    </Card>
  );
};

export default ResourceCard;
