import { useEffect, useState } from "react";
import { getAllSubjects } from "../../modules/subjectManager";
import { Button } from "reactstrap";

const ResourceSubjectFilter = ({
  params,
  setFilteredResources,
  filteredResourcesAll,
  setSubjectFiltered,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectNames, setSelectedSubjectNames] = useState([]);
  const [displayedSubjectNames, setDisplayedSubjectNames] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    getAllSubjects().then((subjects) => {
      subjects.sort((a, b) => a.name.localeCompare(b.name));
      setSubjects(subjects);
    });
  }, []);

  useEffect(() => {
    setIsChecked(Array(subjects.length).fill(false));
  }, [subjects]);

  useEffect(() => {
    setSelectedSubjects([]);
    setSelectedSubjectNames([]);
    setDisplayedSubjectNames([]);
    setIsChecked(Array(subjects.length).fill(false));
  }, [params]);

  const onCheck = (event) => {
    setIsChecked((prevState) => {
      let copy = [...prevState];
      copy[event.target.id] = event.target.checked;
      return copy;
    });
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
      setDisplayedSubjectNames([]);
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
      setDisplayedSubjectNames(selectedSubjectNames);
    }
  };

  const topSubjects = subjects.slice(0, 5);
  const remainingSubjects = subjects.slice(5);

  return (
    <div>
      {!Object.keys(params).includes("subject") && (
        <div>
          {displayedSubjectNames.length > 0 && (
            <div className="">
              <strong>Additional subject filters:</strong>
              <ul className="ps-2 list-unstyled">
                {displayedSubjectNames.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-grey p-2 mb-2">
            <strong>Filter by subject</strong>
            <ul className="subjects-ul">
              {topSubjects.map((subject, index) => (
                <li className="subjects-li ps-1 pe-1" key={subject.id}>
                  <div className="subjects-li-contents">
                    <input
                      checked={isChecked[index] || false}
                      id={index}
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
                  {remainingSubjects.map((subject, index) => (
                    <div key={subject.id} className="subjects-li-contents">
                      <li className="subjects-li ps-1 pe-1">
                        <input
                          checked={
                            isChecked[index + topSubjects.length] || false
                          }
                          id={index + topSubjects.length}
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
      )}
    </div>
  );
};

export default ResourceSubjectFilter;
