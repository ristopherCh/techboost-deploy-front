import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { me } from "../../modules/authManager";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    me().then(setUser);
  }, [review]);

  const isCurrentUser = review.userId === user.id;

  return (
    <Card className="m-2" key={review.id}>
      <CardBody>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <strong>{review.userProfile?.name}</strong>{" "}
            {isCurrentUser ? "(This is you!)" : ""}
          </div>
          <div>
            {isCurrentUser ? (
              <Link
                className="btn-sm btn btn-color-3 border-none text-black me-5"
                to={`/resources/${review.resourceId}/editreview`}
              >
                Edit review
              </Link>
            ) : (
              <></>
            )}
          </div>
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
