import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResource } from "../../modules/resourceManager";
import ResourceForm from "./ResourceForm";

const ResourceEdit = () => {
  const { id } = useParams();
  const [resource, setResource] = useState({});
  useEffect(() => {
    getResource(id).then(setResource);
  }, []);
  return <ResourceForm resourceEditable={resource} />;
};

export default ResourceEdit;
