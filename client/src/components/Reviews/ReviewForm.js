import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getResource } from "../../modules/resourceManager";
import { me } from "../../modules/authManager";
import { addReview } from "../../modules/reviewManager";

const ReviewForm = () => {
  const params = useParams();
  const [resource, setResource] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(1);
  const [resourceId, setResourceId] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    me().then(setCurrentUser);
  }, []);

  useEffect(() => {
    setResourceId(parseInt(params.resourceId));
  }, [params]);

  useEffect(() => {
    if (resourceId !== 0) {
      getResource(resourceId).then(setResource);
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
      reviewScore: reviewScore``,
    };
    addReview(reviewObj);

    // Clear form inputs
    setReviewText("");
    setReviewScore(1);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center m-4">Add a Review for</h2>
      <Form className="w-75" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="reviewText">Write your review</Label>
          <Input
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
        <Button className="btn-color-2" type="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;
