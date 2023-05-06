import { useEffect, useState } from "react";
import { getAllResources } from "../../modules/resourceManager";
import ResourceCard from "./ResourceCard";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  

  useEffect(() => {
    getAllResources().then(setResources);
    
  }, []);

  return (
    <div>
      <h2 className="text-center">Resources</h2>
      {resources.map((resource) => (
        <div key={resource.id}>
          <ResourceCard resource={resource} />
        </div>
      ))}
    </div>
  );
};

export default ResourceList;
