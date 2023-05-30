import { useEffect, useState } from "react";
import { getAllSubjects } from "../../modules/subjectManager";
import { Button } from "reactstrap";

const ResourceSubjectFilter = ({
  setFilteredResources,
  filteredResourcesAll,
  setSubjectFiltered,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectNames, setSelectedSubjectNames] = useState([]);

  useEffect(() => {
    getAllSubjects().then((subjects) => {
      subjects.sort((a, b) => a.name.localeCompare(b.name));
      setSubjects(subjects);
    });
  }, []);

  const onCheck = (event) => {
    const isChecked = event.target.checked;
    const value = parseInt(event.target.value);
    const name = event.target.name;
    if (isChecked && !selectedSubjects.includes(value)) {
      setSelectedSubjects((prevState) => [...prevState, value]);
      setSelectedSubjectNames((prevState) => [...prevState, name]);
    }
    if (!isChecked) {
      setSelectedSubjects((prevState) =>
        prevState.filter((subject) => subject !== value)
      );
      setSelectedSubjectNames((prevState) =>
        prevState.filter((subject) => subject !== name)
      );
    }
  };

  const handleSubjectsSelection = () => {
    setSubjectFiltered(true);
    if (selectedSubjects.length === 0) {
      setSubjectFiltered(false);
      setFilteredResources(filteredResourcesAll);
    } else {
      let newState = [];
      filteredResourcesAll.forEach((resource) => {
        resource.subjects.forEach((subject) => {
          selectedSubjects.forEach((selectedSubject) => {
            if (subject.id === selectedSubject) {
              if (!newState.includes(resource)) {
                newState.push(resource);
              }
            }
          });
        });
      });
      setFilteredResources(newState);
    }
  };

  const topSubjects = subjects.slice(0, 5);
  const remainingSubjects = subjects.slice(5);

  return (
    <div>
      <div className="height-250">
        <strong>Additional subject filters:</strong>
        <ul className="ps-2 list-unstyled">
          {selectedSubjectNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="border-grey p-2 mb-2">
        <strong>Subjects</strong>
        <ul className="subjects-ul">
          {topSubjects.map((subject) => (
            <li className="subjects-li ps-1 pe-1" key={subject.id}>
              <div className="subjects-li-contents">
                <input
                  name={subject.name}
                  type="checkbox"
                  value={subject.id}
                  onChange={onCheck}
                />
                <label className="ms-1" htmlFor={subject.name}>
                  {subject.name}
                </label>
              </div>
            </li>
          ))}
          <li className="subjects-container mb-4">
            <input type="checkbox" id="check_id" />
            <label
              id="check_id_label"
              htmlFor="check_id"
              className="color-secondary box-shadow-2"
            ></label>
            <ul className="subjects-ul nested-subjects-ul">
              {remainingSubjects.map((subject) => (
                <div key={subject.id} className="subjects-li-contents">
                  <li className="subjects-li ps-1 pe-1">
                    <input
                      name={subject.name}
                      type="checkbox"
                      value={subject.id}
                      onChange={onCheck}
                    />
                    <label className="ms-1" htmlFor={subject.name}>
                      {subject.name}
                    </label>
                  </li>
                </div>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <Button
        className="btn-sm color-medium-2 border-none text-black box-shadow-2"
        onClick={handleSubjectsSelection}
      >
        Apply
      </Button>
    </div>
  );
};

export default ResourceSubjectFilter;
