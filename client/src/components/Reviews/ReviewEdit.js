import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getResource } from "../../modules/resourceManager";
import { me } from "../../modules/authManager";
import {
  addReview,
  getReviewByResourceIdAndUser,
} from "../../modules/reviewManager";
import ReviewForm from "./ReviewForm";
const ReviewEdit = () => {
  const { resourceId } = useParams();
  const editing = true;

  return <ReviewForm editing={editing} />;
};

export default ReviewEdit;
