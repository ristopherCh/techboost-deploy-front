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
          className="btn-sm btn btn-color-3 border-none text-black me-5"
          to={`/resources/${review.resourceId}/editreview`}
        >
          Edit
        </Link>
        <Button
          className="btn btn-sm btn-color-2 border-none text-black me-5"
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
    <Card className="m-2" key={review.id}>
      <CardBody>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <strong>{review.userProfile?.name}</strong>{" "}
          </div>
          <div>{isCurrentUser ? <UserButtons /> : <></>}</div>
        </div>
        <div>
          <strong>Rating: </strong> {review.reviewScore}/5{" "}
        </div>
        <div>{review.reviewText}</div>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
