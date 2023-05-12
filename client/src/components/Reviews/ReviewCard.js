import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { deleteReview } from "../../modules/reviewManager";
import StarRating from "../StarRating";

const ReviewCard = (props) => {
  const { review, user, setReviews, getWhicheverReviews, resourceId } = props;
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    setIsCurrentUser(review.userId === user?.id);
  }, [user, review]);

  const handleHideConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteButton = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = (reviewId) => {
    deleteReview(reviewId).then(() => {
      if (getWhicheverReviews.name === "getReviewsByUserId") {
        getWhicheverReviews(user.id).then(setReviews);
      }
      if (getWhicheverReviews.name === "getReviewsByResourceId") {
        getWhicheverReviews(resourceId).then(setReviews);
      }
    });
  };

  const DeleteModal = ({ show, onHide, onConfirm }) => {
    return (
      <Modal isOpen={show} toggle={onHide}>
        <ModalBody>Are you sure you want to delete this comment?</ModalBody>
        <ModalFooter>
          <Button onClick={onHide}>Cancel</Button>
          <Button onClick={onConfirm}>Delete</Button>
        </ModalFooter>
      </Modal>
    );
  };

  const UserButtons = () => {
    return (
      <>
        <Link
          className="btn-sm btn color-secondary border-none text-black me-5 box-shadow-2"
          to={`/resources/${review.resourceId}/editreview`}
        >
          Edit
        </Link>
        <Button
          className="btn btn-sm btn-delete border-none text-black me-5 box-shadow-2"
          onClick={handleDeleteButton}
        >
          Delete
        </Button>
        <DeleteModal
          show={showDeleteConfirmation}
          onHide={handleHideConfirmation}
          onConfirm={() => handleConfirmDelete(review.id)}
        />
      </>
    );
  };

  return (
    <Card className="m-2 box-shadow" key={review.id}>
      <CardBody>
        <div className="d-flex flex-row justify-content-between">
          <div className="mb-2">
            {
              <img
                className="me-2 header-image"
                src={review.userProfile.imageUrl}
                alt="User"
              />
            }{" "}
            <strong>{review.userProfile?.name}</strong>{" "}
          </div>
          <div>{isCurrentUser ? <UserButtons /> : <></>}</div>
        </div>
        <div className="d-flex">
          {/* <strong>Rating: </strong> {review.reviewScore}/5{" "} */}
          <StarRating rating={review.reviewScore} />
        </div>
        <div>{review.reviewText}</div>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
