import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllSubjects } from "../../modules/subjectManager";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const ResourceSubjectFilter = () => {
  const [subjects, setSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(true);

  useEffect(() => {
    getAllSubjects().then((subjects) => {
      subjects.sort((a, b) => a.name.localeCompare(b.name));
      setSubjects(subjects);
    });
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const topSubjects = subjects.slice(0, 5);
  const remainingSubjects = subjects.slice(5);

  return (
    <div className="border-grey p-2 mb-5">
      <strong>Subjects</strong>
      <ul className="subjects-ul">
        {topSubjects.map((subject) => (
          <li className="subjects-li ps-1 pe-1" key={subject.id}>
            <div className="subjects-li-contents">
              <input name={subject.name} type="checkbox" />
              <label className="ms-1" htmlFor={subject.name}>
                {subject.name}
              </label>
            </div>
          </li>
        ))}
        <li className="subjects-container mb-4">
          {/* <button onClick={toggleDropdown} aria-expanded={dropdownOpen}>
            Filter by Subject
          </button> */}
          <input type="checkbox" id="check_id" />
          <label id="check_id_label" for="check_id" className="color-secondary box-shadow-2"></label>
          <ul className="subjects-ul nested-subjects-ul">
            {remainingSubjects.map((subject) => (
              <div key={subject.id} className="subjects-li-contents">
                <li className="subjects-li ps-1 pe-1">
                  <input name={subject.name} type="checkbox" />
                  <label className="ms-1" htmlFor={subject.name}>
                    {subject.name}
                  </label>
                </li>
              </div>
            ))}
          </ul>
        </li>
      </ul>
      <div></div>
    </div>
  );
};

export default ResourceSubjectFilter;
