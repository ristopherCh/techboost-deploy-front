import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllResources,
  getResourcesByCreator,
  getResourcesByMediaType,
  getResourcesBySubject,
  getResourcesByUserId,
} from "../../modules/resourceManager";
import ResourceCard from "./ResourceCard";
import { me } from "../../modules/authManager";
import { ClipLoader } from "react-spinners";

const ResourceList = () => {
  const params = useParams();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [header, setHeader] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    me().then(setCurrentUser);
  }, []);

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      getAllResources().then(setResources);
      setHeader("All Resources");
    } else {
      if (params.mediaType) {
        getResourcesByMediaType(params.mediaType).then(setResources);
        setHeader(params.mediaType);
      }
      if (params.subject) {
        getResourcesBySubject(params.subject).then(setResources);
        setHeader(params.subject);
      }
      if (params.creator) {
        getResourcesByCreator(params.creator).then(setResources);
        setHeader(params.creator);
      }
    }
    setSortBy("");
  }, [params]);

  useEffect(() => {
    setFilteredResources(resources.reverse());
    setSortBy("");
  }, [resources]);

  useEffect(() => {
    let copy = [...resources];
    if (sortBy === "date") {
      copy.sort(
        (a, b) => new Date(b.datePublished) - new Date(a.datePublished)
      );
      setFilteredResources(copy);
    }
    if (sortBy === "rating") {
      copy.sort((a, b) => {
        const avgScoreA =
          a.reviews.reduce((sum, review) => sum + review.reviewScore, 0) /
          a.reviews.length;
        const avgScoreB =
          b.reviews.reduce((sum, review) => sum + review.reviewScore, 0) /
          b.reviews.length;
        return avgScoreB - avgScoreA;
      });
      setFilteredResources(copy);
    }
    if (sortBy === "reviews") {
      copy.sort((a, b) => {
        return b.reviews.length - a.reviews.length;
      });
      setFilteredResources(copy);
    }
    if (sortBy === "price") {
      copy.sort((a, b) => {
        return a.price - b.price;
      });
      setFilteredResources(copy);
    }
  }, [sortBy]);

  useEffect(() => {
    if (resources.length > 0 && Object.keys(currentUser).length > 0) {
      setLoading(false);
    }
  }, [resources, currentUser]);

  useEffect(() => {
    if (
      Object.keys(params).length !== 0 &&
      Object.keys(currentUser).length !== 0
    ) {
      if (params.user) {
        getResourcesByUserId(currentUser.id).then(setResources);
        setHeader(currentUser.name);
      }
    }
  }, [params, currentUser]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {loading ? (
        <ClipLoader loading={loading} />
      ) : (
        <>
          <h4 className="mt-2">Results for:</h4>
          <h2 className="text-center m-2">{header}</h2>
          <div id="trouble" className="w-100 d-flex flex-row">
            <div className="margin-left-2 width-100">
              <strong>Sort by:</strong>
              <div>
                <input
                  onChange={handleSortChange}
                  type="radio"
                  name="ratingOption"
                  value="date"
                  className="me-2"
                  checked={sortBy === "date"}
                />
                <label htmlFor="date">Newest first</label>
              </div>
              <div>
                <input
                  onChange={handleSortChange}
                  type="radio"
                  name="ratingOption"
                  value="reviews"
                  className="me-2"
                  checked={sortBy === "reviews"}
                />
                <label htmlFor="reviews">Most reviewed</label>
              </div>
              <div>
                <input
                  onChange={handleSortChange}
                  type="radio"
                  name="ratingOption"
                  value="rating"
                  className="me-2"
                  checked={sortBy === "rating"}
                />
                <label htmlFor="rating">Rating</label>
              </div>
              <div>
                <input
                  onChange={handleSortChange}
                  type="radio"
                  name="ratingOption"
                  value="price"
                  className="me-2"
                  checked={sortBy === "price"}
                />
                <label htmlFor="rating">Lowest price</label>
              </div>
            </div>
            {resources.length === 0 ? (
              <h3 className="mt-5">No resources match this search!</h3>
            ) : (
              <></>
            )}
            <div id="center-me" className="w-50 min-width-500px mx-auto">
              {filteredResources.map((resource) => (
                <ResourceCard
                  reviewsShowing={false}
                  currentUser={currentUser}
                  key={resource.id}
                  resource={resource}
                />
              ))}
            </div>
            <div className="margin-right-2 width-100"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResourceList;
