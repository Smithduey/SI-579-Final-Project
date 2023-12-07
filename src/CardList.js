import React, { useState, useEffect } from 'react';

const DeckDisplay = ({ deck }) => (
  <div style={{ flex: 1, marginLeft: '20px' }}>
    <h3 style={{ marginBottom: '10px' }}>Deck</h3>
    <ul style={{ listStyleType: 'none', padding: '3px', border: '1px solid #ddd', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px' }}>
      {deck.map((imageUrl, index) => (
        <li key={index} style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <img src={imageUrl} alt={`Card ${index + 1}`} style={{ width: '50%' }} />
        </li>
      ))}
    </ul>
  </div>
);

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
              <li key={card.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', width: '600px' }}>
                {card.imageUrl && (
                  <div style={{ marginRight: '10px' }}>
                    <img src={card.imageUrl} alt={card.name} style={{ width: '250px', height: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                  </div>
                )}
                <div>
                  <strong>Name:</strong> {card.name} <br />
                  <strong>Artist:</strong> {card.artist} <br />
                  <strong>Set:</strong> {card.set} <br />
                  <strong>Color:</strong> {card.colors ? card.colors.join(', ') : 'N/A'} <br />
                  <strong></strong> {card.text} <br />
                  <button onClick={() => addToDeck(card)} style={{ marginTop: '10px', background: '#4CAF50', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none' }}>
                    Add to Deck
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
     
      <DeckDisplay deck={deck} />
    </div>
  );
};

export default CardList;
