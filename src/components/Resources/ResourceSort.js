const ResourceSort = ({handleSortChange, sortBy}) => {
  return (
    <>
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
    </>
  );
};

export default ResourceSort;
