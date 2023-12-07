
import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import DeckDisplay from './DeckDisplay';

const CardList = ({ cards }) => {
  const [deck, setDeck] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const storedDeck = localStorage.getItem('deck');
    if (storedDeck) {
      setDeck(JSON.parse(storedDeck));
    }
  }, []);

  const addToDeck = (card) => {
    if (card.imageUrl) {
      const updatedDeck = [...deck, card.imageUrl];
      setDeck(updatedDeck);
      localStorage.setItem('deck', JSON.stringify(updatedDeck));
    }
  };

  const filterResults = (query) => {
    const filtered = uniqueCards.filter(
      (card) =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        (card.colors && card.colors.join(', ').toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredCards(filtered);
  };

  const uniqueCardsMap = new Map();

  cards.forEach((card) => {
    if (!uniqueCardsMap.has(card.name)) {
      uniqueCardsMap.set(card.name, card);
    }
  });

  const uniqueCards = Array.from(uniqueCardsMap.values());

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <h2>Search Results</h2>
        <div>
          <input
            type="text"
            placeholder="Filter results..."
            onChange={(e) => filterResults(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {(filteredCards.length > 0 ? filteredCards : uniqueCards).map((card) => (
              <CardItem key={card.id} card={card} addToDeck={addToDeck} />
            ))}
          </ul>
        </div>
      </div>
      <DeckDisplay deck={deck} cardList={cards} />
    </div>
  );
};

export default CardList;
