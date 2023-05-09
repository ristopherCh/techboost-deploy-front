import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteResource, getResource } from "../../modules/resourceManager";
import ResourceCard from "./ResourceCard";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { me } from "../../modules/authManager";

const ResourceDetails = () => {
  const { id } = useParams();
  const [resource, setResource] = useState({});
  const [showConfirmation, setShowDeleteConfirmation] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    me().then(setUser);
    getResource(id).then(setResource);
  }, []);

  const DeleteModal = ({ show, onHide, onConfirm }) => {
    return (
      <Modal isOpen={show} toggle={onHide}>
        <ModalBody>Are you sure you want to delete this resource?</ModalBody>
        <ModalFooter>
          <Button onClick={onHide}>Cancel</Button>
          <Button onClick={onConfirm}>Delete</Button>
        </ModalFooter>
      </Modal>
    );
  };

  const handleConfirmDelete = (resourceId) => {
    deleteResource(resourceId).then(navigate("/resources"));
  };

  const handleHideConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeactivateClick = () => {
    setShowDeleteConfirmation(!showConfirmation);
  };

  const showButtons = user.id === resource.submitterId;

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-50 min-width-500px">
        <ResourceCard resource={resource} currentUser={user} />
      </div>
      <Button onClick={() => navigate("edit")}>Edit</Button>
      {Object.keys(user).length > 0 && showButtons ? (
        <div>
          <Button className="m-3" onClick={() => navigate("edit")}>
            Edit
          </Button>
          <Button className="m-3" onClick={handleDeactivateClick}>
            Delete
          </Button>
          <DeleteModal
            show={showConfirmation}
            onHide={handleHideConfirmation}
            onConfirm={() => handleConfirmDelete(resource.id)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ResourceDetails;
