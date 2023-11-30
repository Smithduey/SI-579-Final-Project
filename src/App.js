import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CardList from './CardList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filteredCards, setFilteredCards] = useState([]);

  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setFilterType(type);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `https://api.magicthegathering.io/v1/cards?${filterType}=${searchTerm}`
        );
        const data = await response.json();
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

