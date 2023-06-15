import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { getReviewsByResourceId } from "../../modules/reviewManager";
import ReviewCard from "../Reviews/ReviewCard";
import RatingDisplay from "../Reviews/RatingDisplay";

const ResourceCard = ({ resource, currentUser, reviewsShowing }) => {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowReviews(reviewsShowing);
  }, []);

  useEffect(() => {
    if (!reviewsShowing) {
      setShowReviews(false);
    }
  }, [location]);

  useEffect(() => {
    if (resource.id) {
      const copy = [...resource.reviews];
      copy.sort((a, b) => {
        if (a.userId === currentUser.id) {
          return -1;
        }
        return 0;
      });
      setReviews(copy);
    }
  }, [resource]);

  useEffect(() => {
    for (let review of reviews) {
      if (review.userId === currentUser?.id) {
        setHasReviewed(true);
      }
    }
  }, [reviews, currentUser]);

  useEffect(() => {
    if (reviews.length > 0) {
      setLoading(false);
    }
  }, [reviews]);

  const handleSeeReviewsClick = () => {
    setShowReviews(!showReviews);
  };

  return (
    <Card className="box-shadow">
      <CardHeader className="color-light">
        <Link className="clean-link" to={`/resources/details/${resource.id}`}>
          <h5>{resource.name}</h5>
        </Link>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-center white-background">
          <img
            className="resource-image"
            src={resource?.imageUrl}
            alt="resource"
          />
        </div>
        {reviews.length !== 0 ? (
          <RatingDisplay reviews={reviews} />
        ) : (
          <h5 className="text-center mb-3">No reviews</h5>
        )}
        <div className="d-flex justify-content-around mb-2">
          <a
            type="submit"
            href={resource.resourceUrl}
            className="width-50 clean-link btn btn-sm color-medium-2 w-25 box-shadow-2"
            target="_blank"
            rel="noreferrer noopener"
          >
            Go to resource
          </a>
          {hasReviewed ? (
            <Link
              className="width-50 clean-link btn btn-sm color-secondary w-25 box-shadow-2"
              to={`/resources/${resource.id}/editreview`}
            >
              Edit your review
            </Link>
          ) : (
            <Link
              className="width-50 clean-link btn btn-sm color-dark-2 w-25 box-shadow-2"
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
          <strong>Published:</strong>{" "}
          {new Date(resource.datePublished).toLocaleDateString()}
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
                <h3 className="m-3 text-center">Reviews</h3>
                <div className="m-2">
                  {reviews.slice(0, 3).map((review) => (
                    <ReviewCard
                      resourceId={resource.id}
                      getWhicheverReviews={getReviewsByResourceId}
                      user={currentUser}
                      key={review.id}
                      review={review}
                      setReviews={setReviews}
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-around">
                  <Button
                    className="btn-sm color-medium border-none text-black box-shadow-2"
                    onClick={handleSeeReviewsClick}
                  >
                    Hide reviews
                  </Button>
                  <Link
                    className="width-50 clean-link btn btn-sm color-medium-2 w-25 box-shadow-2"
                    to={`/resources/${resource.id}/allreviews`}
                  >
                    See all reviews
                  </Link>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Button
                  className="btn-sm btn-color-light text-black box-shadow-2"
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
