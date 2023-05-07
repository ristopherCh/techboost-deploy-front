import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllResources,
  getResourcesByMediaType,
  getResourcesBySubject,
} from "../../modules/resourceManager";
import ResourceCard from "./ResourceCard";

const ResourceList = () => {
  const params = useParams();
  const [resources, setResources] = useState([]);
  const [header, setHeader] = useState("");

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      getAllResources().then(setResources);
      setHeader("All Resources")
    } else {
      if (params.mediaType) {
        getResourcesByMediaType(params.mediaType).then(setResources);
        setHeader(params.mediaType);
      }
      if (params.subject) {
        getResourcesBySubject(params.subject).then(setResources);
        setHeader(params.subject);
      }
    }
  }, [params]);

  return (
    <div>
      <h2 className="text-center">{header}</h2>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;
