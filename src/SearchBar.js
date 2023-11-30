import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');

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
        <option value="color">Color</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;