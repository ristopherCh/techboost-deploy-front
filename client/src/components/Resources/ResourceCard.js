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
          <h5>{resource.name}</h5>
        </Link>
      </CardHeader>
      <CardBody>
        <div>
          <strong>Media Type:</strong> {resource.mediaType?.name}
        </div>
        <div className="mt-2">
          <strong>Description:</strong>
        </div>
        <div>{resource.description}</div>
        <div className="mt-2">
          <strong>Creator:</strong> {resource.creator}
        </div>
        <div className="mt-2">
          <strong>Price:</strong> {resource.price === 0 ? "Free" : resource.price}
        </div>
        <div className="mt-2">
          {resource.subjects?.length > 0 && <strong>Subjects</strong>}
        </div>
        <ul className="list-unstyled">
          {resource.subjects?.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
      </CardBody>
      <CardLink href={resource.resourceUrl} target="_blank">
        <div className="ms-2">Link to Resource</div>
      </CardLink>
    </Card>
  );
};

export default ResourceCard;
