import { useEffect, useState } from "react";
import { getAllSubjects } from "../../modules/subjectManager";
import { getAllMediaTypes } from "../../modules/mediaTypeManager";
import { useNavigate } from "react-router-dom";

const ResourceBrowse = () => {
  const navigate = useNavigate();
  const [allSubjects, setAllSubjects] = useState([]);
  const [allMediaTypes, setAllMediaTypes] = useState([]);
  useEffect(() => {
    getAllSubjects().then(setAllSubjects);
    getAllMediaTypes().then(setAllMediaTypes);
  }, []);

  const handleSubjectClick = (event) => {
    navigate(`/resources/subjects/${event.target.innerText}`);
  };

  const handleMediaTypeClick = (event) => {
    navigate(`/resources/mediaTypes/${event.target.innerText}`);
  };

  return (
    <div className="d-flex flex-row justify-content-around">
      <div>
        <div className="m-3">
          <strong>Subjects</strong>
        </div>
        <ul>
          {allSubjects.map((subject) => (
            <li
              className="cursor-pointer list-unstyled"
              key={subject.id}
              value={subject.id}
              onClick={handleSubjectClick}
            >
              {subject.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="m-3">
          <strong>Media types</strong>
        </div>
        <ul>
          {allMediaTypes.map((mediaType) => (
            <li
              className="cursor-pointer list-unstyled"
              key={mediaType.id}
              value={mediaType.id}
              onClick={handleMediaTypeClick}
            >
              {mediaType.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResourceBrowse;
