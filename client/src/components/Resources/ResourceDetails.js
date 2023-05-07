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
    <>
      <ResourceCard resource={resource} />
      <Button onClick={() => navigate("edit")}>Edit</Button>
      {Object.keys(user).length > 0 && showButtons ? (
        <>
          <Button onClick={() => navigate("edit")}>Edit</Button>
          <Button onClick={handleDeactivateClick}>Delete</Button>
          <DeleteModal
            show={showConfirmation}
            onHide={handleHideConfirmation}
            onConfirm={() => handleConfirmDelete(resource.id)}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ResourceDetails;
