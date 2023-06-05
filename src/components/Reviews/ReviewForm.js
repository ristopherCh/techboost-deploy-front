import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getResource } from "../../modules/resourceManager";
import { me } from "../../modules/authManager";
import {
  addReview,
  editReview,
  getReviewByResourceIdAndUser,
} from "../../modules/reviewManager";

const ReviewForm = ({ editing }) => {
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const [resource, setResource] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(1);
  const [reviewId, setReviewId] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    me().then(setCurrentUser);
  }, []);

  // useEffect(() => {
  //   console.log(editing);
  // }, [editing]);

  useEffect(() => {
    if (resourceId !== 0) {
      getResource(resourceId).then(setResource);
      if (editing) {
        getReviewByResourceIdAndUser(resourceId).then((review) => {
          setReviewText(review.reviewText);
          setReviewScore(review.reviewScore);
          setReviewId(review.id);
        });
      }
    }
  }, [resourceId]);

  //~~~~~~~~~~~~
  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewScoreChange = (event) => {
    setReviewScore(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let reviewObj = {
      userId: currentUser.id,
      resourceId: resourceId,
      reviewText: reviewText,
      reviewScore: reviewScore,
      dateCreated: new Date(),
    };
    addReview(reviewObj).then(() => {
      navigate(`/resources/details/${resourceId}`);
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    let reviewObj = {
      userId: currentUser.id,
      resourceId: resourceId,
      reviewText: reviewText,
      reviewScore: reviewScore,
      dateCreated: new Date(),
    };
    editReview(reviewObj, reviewId).then(() => {
      navigate(`/resources/details/${resourceId}`);
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h4 className="text-center m-4">Add a Review for:</h4>
      <h2 className="mb-4">{resource?.name}</h2>
      <h5>
        {resource.mediaType?.name} by {resource.creator}
      </h5>
      <Form className="w-75">
        <FormGroup>
          <Label for="reviewText">Write your review</Label>
          <Input
            className="textarea-height-200"
            type="textarea"
            name="reviewText"
            id="reviewText"
            value={reviewText}
            onChange={handleReviewTextChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="reviewScore">Rate this resource</Label>
          <Input
            type="select"
            name="reviewScore"
            id="reviewScore"
            value={reviewScore}
            onChange={handleReviewScoreChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Input>
        </FormGroup>
        {editing ? (
          <Button className="btn-color-2" type="submit" onClick={handleEdit}>
            Save edit
          </Button>
        ) : (
          <Button className="btn-color-2" type="submit" onClick={handleSubmit}>
            Submit Review
          </Button>
        )}
      </Form>
    </div>
  );
};

export default ReviewForm;
