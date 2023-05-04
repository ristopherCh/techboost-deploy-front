import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { me } from "../../modules/authManager";
import { getAllMediaTypes } from "../../modules/mediaTypeManager";
import { addResource, editResource } from "../../modules/resourceManager";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    me().then((data) => {
      setResource((prevState) => ({
        ...prevState,
        submitterId: data.id,
      }));
    });
    getAllMediaTypes().then(setAllMediaTypes);
  }, []);

  useEffect(() => {
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
    copy.price = parseFloat(copy.price);
    addResource(copy).then((data) => {
      navigate(`/resources/details/${data.id}`);
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    let copy = { ...resource };
    copy.mediaTypeId = parseInt(copy.mediaTypeId);
    copy.price = parseFloat(copy.price);
    editResource(copy).then(() => {
      navigate(`/resources/details/${resource.id}`);
    });
  };

  return (
    <Form>
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
        <Label for="mediaTypeId">Media Type ID</Label>
        {/* <Input
          type="text"
          name="mediaTypeId"
          id="mediaTypeId"
          placeholder="Enter media type ID"
          value={resource.mediaTypeId}
          onChange={handleInputChange}
        /> */}
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
      {Object.keys(resourceEditable).length > 0 ? (
        <Button type="submit" onClick={handleEdit}>
          Edit Resource
        </Button>
      ) : (
        <Button type="submit" onClick={handleSubmit}>
          Create Resource
        </Button>
      )}
    </Form>
  );
};

export default ResourceForm;
