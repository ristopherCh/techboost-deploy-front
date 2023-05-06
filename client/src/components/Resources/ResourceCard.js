import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardLink } from "reactstrap";

const ResourceCard = ({ resource }) => {
  return (
    <Card className="m-2">
      <CardHeader>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={`/resources/details/${resource.id}`}
        >
          {resource.name}
        </Link>
      </CardHeader>
      <CardBody>
        <div>
          <strong>Media type</strong>
        </div>
        <div>{resource.mediaType?.name}</div>
        <div className="mt-2">
          <strong>Description</strong>
        </div>
        <div>{resource.description}</div>
        <div className="mt-2">
          <strong>Creator</strong>
        </div>
        <div>{resource.creator}</div>
        <div className="mt-2">
          <strong>Price</strong>
        </div>
        {resource.price === 0 ? "Free" : <div>{resource.price}</div>}
      </CardBody>
      <CardLink href={resource.resourceUrl} target="_blank">
        <div className="ms-2">Link to resource</div>
      </CardLink>
    </Card>
  );
};

export default ResourceCard;
