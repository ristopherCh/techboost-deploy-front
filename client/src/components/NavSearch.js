import { useEffect, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { getAllSubjects } from "../modules/subjectManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllMediaTypes } from "../modules/mediaTypeManager";

const NavSearch = () => {
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allMediaTypes, setAllMediaTypes] = useState([]);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [searchWasChosen, setSearchWasChosen] = useState(false);
  const [allSearchableTerms, setAllSearchableTerms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubjects().then(setAllSubjects);
    getAllMediaTypes().then(setAllMediaTypes);
  }, []);

  useEffect(() => {
    setAllSearchableTerms([...allSubjects, ...allMediaTypes]);
  }, [allMediaTypes, allSubjects]);

  useEffect(() => {
    let filteringSubjects = allSubjects.filter((subject) =>
      subject.name.toLowerCase().includes(subjectSearch.toLowerCase())
    );
    setFilteredSubjects(filteringSubjects);
    if (subjectSearch === "") {
      setFilteredSubjects([]);
    }
  }, [subjectSearch]);

  useEffect(() => {
    if (searchWasChosen) {
      setFilteredSubjects([]);
      setSearchWasChosen(false);
    }
  }, [searchWasChosen]);

  const handleSubjectSearchChange = (event) => {
    setSubjectSearch(event.target.value);
  };

  const handleSearchSelection = (event) => {
    setSubjectSearch(event.target.innerText);
    setSearchWasChosen(true);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/resources/subjects/${subjectSearch}`);
    setSubjectSearch("");
  };

  return (
    <div className="d-flex flex-direction-column">
      <Form
        className="d-flex flex-direction-row align-items-center"
        onSubmit={handleSearchSubmit}
      >
        <Input
          className="searchbar-height me-1"
          type="text"
          placeholder=""
          name="search"
          value={subjectSearch ? subjectSearch : ""}
          onChange={handleSubjectSearchChange}
        />
        <Button className="btn-color-2 btn-sm">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <ul className="list-group searchbar-alignment" id="results">
        {filteredSubjects.map((subject) => (
          <button
            key={subject.id}
            type="button"
            value={subject.id}
            className="list-group-item list-group-item-action"
            onClick={handleSearchSelection}
          >
            {subject.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default NavSearch;
