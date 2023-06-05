import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllResources,
  getResourcesByCreator,
  getResourcesByMediaType,
  getResourcesBySubject,
  getResourcesByUserId,
  searchResources,
} from "../../modules/resourceManager";
import ResourceCard from "./ResourceCard";
import { me } from "../../modules/authManager";
import { ClipLoader } from "react-spinners";
import ResourceSubjectFilter from "./ResourceSubjectFilter";
import ResourceSort from "./ResourceSort";

const ResourceList = () => {
  const params = useParams();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [filteredResourcesAll, setFilteredResourcesAll] = useState([]);
  const [header, setHeader] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [subjectFiltered, setSubjectFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 5;
  const totalPages = Math.ceil(filteredResourcesAll.length / resourcesPerPage);

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
      if (params.searchTerm) {
        searchResources(params.searchTerm).then(setResources);
        setHeader(`"${params.searchTerm}"`);
      }
    }
    setSortBy("");
  }, [params]);

  useEffect(() => {
    setFilteredResources(resources.reverse());
    setFilteredResourcesAll(resources.reverse());
    setSortBy("");
  }, [resources]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * resourcesPerPage;
    const endIndex = startIndex + resourcesPerPage;
    const currentResources = filteredResourcesAll.slice(startIndex, endIndex);
    setFilteredResources(currentResources);
  }, [currentPage]);

  useEffect(() => {
    handleSortBy();
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

  const handleSortBy = () => {
    let copy = [...filteredResources];
    if (sortBy === "date") {
      copy.sort(
        (a, b) => new Date(b.datePublished) - new Date(a.datePublished)
      );
      setFilteredResources(copy);
      if (!subjectFiltered) {
        setFilteredResourcesAll(copy);
      }
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
      if (!subjectFiltered) {
        setFilteredResourcesAll(copy);
      }
    }
    if (sortBy === "reviews") {
      copy.sort((a, b) => {
        return b.reviews.length - a.reviews.length;
      });
      setFilteredResources(copy);
      if (!subjectFiltered) {
        setFilteredResourcesAll(copy);
      }
    }
    if (sortBy === "price") {
      copy.sort((a, b) => {
        return a.price - b.price;
      });
      setFilteredResources(copy);
      if (!subjectFiltered) {
        setFilteredResourcesAll(copy);
      }
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container-fluid width-95">
      {loading ? (
        <ClipLoader loading={loading} />
      ) : (
        <>
          <h4 className="mt-2 text-center">Results for:</h4>
          <h2 className="text-center m-2">{header}</h2>
          <div className="row">
            <div
              id="left-column"
              className="col-sm-6 col-lg-2 order-sm-1 order-lg-1"
            >
              <ResourceSort
                sortBy={sortBy}
                handleSortChange={handleSortChange}
              />
            </div>
            {resources.length === 0 ? (
              <h3 className="rdetails-body-width min-width-500px mx-auto red-border text-center mt-3">
                No resources match this search!
              </h3>
            ) : (
              <div
                id="center-column"
                className="col-sm-12 col-lg-8 order-sm-2 order-lg-2"
              >
                {filteredResources
                  .slice(0, resourcesPerPage)
                  .map((resource) => (
                    <ResourceCard
                      reviewsShowing={false}
                      currentUser={currentUser}
                      key={resource.id}
                      resource={resource}
                    />
                  ))}
              </div>
            )}
            <div
              className="col-sm-6 col-lg-2 order-sm-1 order-lg-3"
              id="right-column"
            >
              <ResourceSubjectFilter
                params={params}
                setSubjectFiltered={setSubjectFiltered}
                setFilteredResources={setFilteredResources}
                filteredResourcesAll={filteredResourcesAll}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center m-2">
            {currentPage === 1 ? (
              <div className="width-125px"></div>
            ) : (
              <button
                className="width-125px btn btn-sm color-light box-shadow-2"
                onClick={handlePreviousPage}
              >
                Previous Page
              </button>
            )}

            <div className="me-3 ms-3">
              Page {currentPage} of {totalPages}
            </div>
            {currentPage !== totalPages ? (
              <button
                className="width-125px btn btn-sm color-light-2 box-shadow-2"
                onClick={handleNextPage}
              >
                Next Page
              </button>
            ) : (
              <div className="width-125px"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResourceList;
