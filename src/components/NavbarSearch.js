import "../Header.css";
import { Form, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm("");
    navigate(`/resources/search/${searchTerm}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(event);
  };

  return (
    <div className="d-flex flex-direction-column">
      <Form
        className="d-flex flex-direction-row align-items-center"
        onSubmit={handleSubmit}
      >
        <Input
          onChange={handleSearchInput}
          className="searchbar-height me-1 searchbar-width"
          type="text"
          placeholder=""
          value={searchTerm ? searchTerm : ""}
        />
        <Button className="color-medium btn-sm" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="text-black" />
        </Button>
      </Form>
    </div>
  );
};

export default NavbarSearch;
