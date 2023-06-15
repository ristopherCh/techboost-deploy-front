const ResourceSort = ({ handleSortChange, sortBy }) => {
  return (
    <div>
      <strong className="pe-2">Sort by:</strong>
      <select
        onChange={handleSortChange}
        name="ratingOption"
        value={sortBy}
        className="me-2"
      >
        <option value="date">Newest first</option>
        <option value="reviews">Most reviewed</option>
        <option value="rating">Rating</option>
        <option value="price">Lowest price</option>
      </select>
    </div>
  );
};

export default ResourceSort;
