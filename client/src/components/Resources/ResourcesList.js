import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllResources,
  getResourcesByCreator,
  getResourcesByMediaType,
  getResourcesBySubject,
} from "../../modules/resourceManager";
import ResourceCard from "./ResourceCard";
import { me } from "../../modules/authManager";

const ResourceList = () => {
  const params = useParams();
  const [resources, setResources] = useState([]);
  const [header, setHeader] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    me().then(setCurrentUser);
  }, []);

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      getAllResources().then(setResources);
      setHeader("All Resources");
    } else {
      if (params.mediaType) {
        getResourcesByMediaType(params.mediaType).then(setResources);
        setHeader(params.mediaType);
      }
      if (params.subject) {
        getResourcesBySubject(params.subject).then(setResources);
        setHeader(params.subject);
      }
      if (params.creator) {
        getResourcesByCreator(params.creator).then(setResources);
        setHeader(params.creator);
      }
    }
  }, [params]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mt-2">All results for:</h4>
      <h2 className="text-center m-2">{header}</h2>
      {resources.length === 0 ? (
        <h3 className="mt-5">No resources match this search!</h3>
      ) : (
        <></>
      )}
      <div className="w-50 min-width-500px">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
