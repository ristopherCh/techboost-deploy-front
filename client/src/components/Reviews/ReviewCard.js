import { Card, CardBody } from "reactstrap";

const ReviewCard = ({ review }) => {
  return (
    <Card className="m-2" key={review.id}>
      <CardBody>
        <strong>{review.userProfile?.name}</strong>
        <div>
          <strong>Rating: </strong> {review.reviewScore}/5{" "}
        </div>

        <div>{review.reviewText}</div>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
