import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { me } from "../../modules/authManager";
import { getAllMediaTypes } from "../../modules/mediaTypeManager";
import { addResource, editResource } from "../../modules/resourceManager";
import { useNavigate } from "react-router-dom";
import {
  addResourceSubject,
  deleteResourceSubject,
  getAllSubjects,
} from "../../modules/subjectManager";

const ResourceForm = ({ resourceEditable }) => {
  const navigate = useNavigate();
  const [resource, setResource] = useState({
    name: "",
    submitterId: "",
    creator: "",
    mediaTypeId: "",
    description: "",
    price: "",
    datePublished: "",
    imageUrl: "",
    resourceUrl: "",
  });
  const [allMediaTypes, setAllMediaTypes] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [addedSubjects, setAddedSubjects] = useState([]);
  const [header, setHeader] = useState("Create a new resource");
  const [addedResourceSubjects, setAddedResourceSubjects] = useState([]);

  useEffect(() => {
    me().then((data) => {
      setResource((prevState) => ({
        ...prevState,
        submitterId: data.id,
      }));
    });
    getAllSubjects().then(setAllSubjects);
    getAllMediaTypes().then(setAllMediaTypes);
  }, []);

  useEffect(() => {
    if (resourceEditable) {
      if (Object.keys(resourceEditable).length > 0) {
        setResource({
          id: resourceEditable.id,
          name: resourceEditable.name,
          submitterId: resourceEditable.submitterId,
          creator: resourceEditable.creator,
          mediaTypeId: resourceEditable.mediaTypeId,
          description: resourceEditable.description,
          price: resourceEditable.price,
          datePublished: resourceEditable.datePublished.slice(0, 10),
          imageUrl: resourceEditable.imageUrl,
          resourceUrl: resourceEditable.resourceUrl,
        });
      }
      setAddedSubjects(resourceEditable.subjects);
    }
    setHeader(`Edit: ${resourceEditable.name}`);
  }, [resourceEditable]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResource((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let copy = { ...resource };
    copy.mediaTypeId = parseInt(copy.mediaTypeId);
    if (copy.price !== "") {
      copy.price = parseFloat(copy.price);
    }
    addResource(copy).then((newResource) => {
      console.log(newResource);
      for (let subject of addedSubjects) {
        let resourceSubject = {
          resourceId: newResource.id,
          subjectId: subject.id,
        };
        addResourceSubject(resourceSubject);
      }
      navigate(`/resources/details/${newResource.id}`);
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    let copy = { ...resource };
    copy.mediaTypeId = parseInt(copy.mediaTypeId);
    copy.price = parseFloat(copy.price);

    let newResourceSubjects = addedSubjects.filter((addedSubject) => {
      let matchingSubject = resourceEditable.subjects.find((presetSubject) => {
        return presetSubject.id === addedSubject.id;
      });
      return matchingSubject === undefined;
    });
    let removedResourceSubjects = resourceEditable.subjects.filter(
      (presetSubject) => {
        let matchingSubject = addedSubjects.find((addedSubject) => {
          return addedSubject.id === presetSubject.id;
        });
        return matchingSubject === undefined;
      }
    );
    for (let subject of removedResourceSubjects) {
      let foundResourceSubject = resourceEditable.resourceSubjects.find(
        (presetRS) => {
          return presetRS.subjectId === subject.id;
        }
      );
      deleteResourceSubject(foundResourceSubject.id);
    }
    for (let subject of newResourceSubjects) {
      let resourceSubject = {
        resourceId: resourceEditable.id,
        subjectId: subject.id,
      };
      addResourceSubject(resourceSubject);
    }

    editResource(copy).then(() => {
      navigate(`/resources/details/${resource.id}`);
    });
  };

  // ^ Search bar stuff

  const handleSubjectSearchChange = (event) => {
    setSubjectSearch(event.target.value);
  };

  useEffect(() => {
    let filteringSubjects = allSubjects.filter((subject) =>
      subject.name.toLowerCase().includes(subjectSearch.toLowerCase())
    );
    setFilteredSubjects(filteringSubjects);
    if (subjectSearch === "") {
      setFilteredSubjects([]);
    }
  }, [subjectSearch]);

  const handleSearchSelection = (event) => {
    let clickedSubject = allSubjects.find((subject) => {
      return subject.id === parseInt(event.target.value);
    });
    if (!addedSubjects.some((subject) => subject.id === clickedSubject.id)) {
      setAddedSubjects([...addedSubjects, clickedSubject]);
    }
    setFilteredSubjects([]);
    setSubjectSearch("");
  };

  const handleRemoveAddedSubject = (event) => {
    event.preventDefault();
    setAddedSubjects(
      addedSubjects.filter(
        (subject) => subject.id !== parseInt(event.target.value)
      )
    );
  };

  // ^^^^

  return (
    <Form className="m-5">
      <h3 className="text-center">{header}</h3>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter resource name"
          value={resource.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="creator">Creator</Label>
        <Input
          type="text"
          name="creator"
          id="creator"
          placeholder="Enter creator name"
          value={resource.creator}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="mediaTypeId">Media Type</Label>
        <Input
          type="select"
          name="mediaTypeId"
          id="exampleSelect"
          onChange={handleInputChange}
          value={resource.mediaTypeId}
        >
          <option value="">Select an option</option>
          {allMediaTypes.map((mediaType) => (
            <option key={mediaType.id} value={mediaType.id}>
              {mediaType.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="Enter resource description"
          value={resource.description}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Enter resource price"
          value={resource.price}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="datePublished">Date Published</Label>
        <Input
          type="date"
          name="datePublished"
          id="datePublished"
          placeholder="Enter date published"
          value={resource.datePublished}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="imageUrl">Image URL</Label>
        <Input
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="Enter image URL"
          value={resource.imageUrl}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="resourceUrl">Resource URL</Label>
        <Input
          type="text"
          name="resourceUrl"
          id="resourceUrl"
          placeholder="Enter resource URL"
          value={resource.resourceUrl}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <div className="mt-2 mb-2">
          <div>Subjects:</div>
          <ul>
            {addedSubjects?.map((subject) => (
              <li className="mt-2 d-flex flex-row justify-content-between width-200" key={subject.id}>
                <div>{subject.name}</div>
                <button
                  onClick={handleRemoveAddedSubject}
                  value={subject.id}
                  className="ms-2 btn btn-sm btn-color-dark text-white"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Label>Add subjects</Label>
        <div className="search-bar-dropdown">
          <Input
            type="text"
            name="subject"
            placeholder="Search for subjects"
            value={subjectSearch ? subjectSearch : ""}
            onChange={handleSubjectSearchChange}
          />
        </div>
        <ul className="list-group" id="results">
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
      </FormGroup>
      <FormGroup className="mt-2">
        {resourceEditable && Object.keys(resourceEditable).length > 0 ? (
          <Button type="submit" onClick={handleEdit}>
            Save edits
          </Button>
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Create Resource
          </Button>
        )}
      </FormGroup>
    </Form>
  );
};

export default ResourceForm;
