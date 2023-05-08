import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardLink } from "reactstrap";

const ResourceCard = ({ resource }) => {

  return (
    <Card className="m-2">
      <CardHeader className="nice-color">
        <Link className="clean-link" to={`/resources/details/${resource.id}`}>
          <h5>{resource.name}</h5>
        </Link>
      </CardHeader>
      <CardBody>
        <div>
          <strong>Media Type:</strong>{" "}
          <Link
            className="clean-link"
            to={`/resources/mediaTypes/${resource.mediaType?.name}`}
          >
            {" "}
            {resource.mediaType?.name}
          </Link>
        </div>
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
        <div className="d-flex justify-content-around">
          <a
            type="submit"
            href={resource.resourceUrl}
            className="width-50 clean-link btn btn-sm btn-color w-25"
            target="_blank"
            rel="noreferrer noopener"
          >
            Go to resource
          </a>
          
          <NavLink
            className="width-50 clean-link btn btn-sm btn-color-2 w-25"
            to={`/resources/${resource.id}/addreview`}
          >
            Add a review
          </NavLink>
        </div>
      </CardBody>
    </Card>
  );
};

export default ResourceCard;
