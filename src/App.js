import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CardList from './CardList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filteredCards, setFilteredCards] = useState([]);

  // Function to handle search and update state
  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setFilterType(type);
  };

  // Effect hook to fetch cards based on search term and filter type
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `https://api.magicthegathering.io/v1/cards?${filterType}=${searchTerm}`
        );
        const data = await response.json();
        // Extract the array of cards from the response and update the state
        const searchResults = data.cards || [];
        setFilteredCards(searchResults);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [searchTerm, filterType]);

  return (
    <div>
      <h1>Magic: The Gathering Card Search</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search by name, artist, set, or color" />
      <CardList cards={filteredCards} />
    </div>
  );
};

export default App;

