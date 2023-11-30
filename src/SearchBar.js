import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder }) => {
  
  // State variables for search term and filter type
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');
  
  // Functions that handle changes in search input and filter dropdown
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, filterType);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder || 'Search'}
        value={searchTerm}
        onChange={handleChange}
      />
      <select value={filterType} onChange={handleFilterChange}>
        <option value="name">Name</option>
        <option value="artist">Artist</option>
        <option value="set">Set</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;