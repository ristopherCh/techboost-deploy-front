import { useEffect, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { getAllSubjects } from "../modules/subjectManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAllMediaTypes } from "../modules/mediaTypeManager";
import { getAllResources } from "../modules/resourceManager";

const NavSearch = () => {
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allMediaTypes, setAllMediaTypes] = useState([]);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [chosenResourceId, setChosenResourceId] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchWasChosen, setSearchWasChosen] = useState(false);
  // const [allSearchableTerms, setAllSearchableTerms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // getAllSubjects().then(setAllSubjects);
    // getAllMediaTypes().then(setAllMediaTypes);
    getAllResources().then(setResources);
  }, []);


  useEffect(() => {
    let filteringResources = resources.filter((resource) =>
      resource.name.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setFilteredResources(filteringResources);
    if (searchPhrase === "") {
      setFilteredResources([]);
    }
  }, [searchPhrase]);

  useEffect(() => {
    if (searchWasChosen) {
      setFilteredResources([]);
      setSearchWasChosen(false);
    }
  }, [searchWasChosen]);

  const handleSearchPhraseChange = (event) => {
    setSearchPhrase(event.target.value);
  };

  const handleSearchSelection = (event) => {
    setSearchPhrase(event.target.innerText);
    setChosenResourceId(event.target.value);
    setSearchWasChosen(true);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // navigate(`/resources/subjects/${searchPhrase}`);
    navigate(`/resources/details/${chosenResourceId}`);
    setSearchPhrase("");
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
          value={searchPhrase ? searchPhrase : ""}
          onChange={handleSearchPhraseChange}
        />
        <Button className="btn-color-2 btn-sm">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <ul className="list-group searchbar-alignment" id="results">
        {filteredResources.map((resource) => (
          <button
            key={resource.id}
            type="button"
            value={resource.id}
            className="list-group-item list-group-item-action"
            onClick={handleSearchSelection}
          >
            {resource.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default NavSearch;
