
import React from 'react';

const CardItem = ({ card, addToDeck }) => (
  <li style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', width: '600px' }}>
    {card.imageUrl && (
      <div style={{ marginRight: '10px' }}>
        <img src={card.imageUrl} alt={card.name} style={{ width: 'auto', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
      </div>
    )}
    <div>
      <strong>Name:</strong> {card.name} <br />
      <strong>Artist:</strong> {card.artist || 'N/A'} <br />
      <strong>Set:</strong> {card.set || 'N/A'} <br />
      <strong>Color:</strong> {card.colors ? card.colors.join(', ') : 'N/A'} <br />
      <br />
      <strong></strong> {card.text || 'N/A'} <br />
      <br />
      <button onClick={() => addToDeck(card)} style={{ marginTop: '10px', background: '#4CAF50', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none' }}>
        Add to Deck
      </button>
    </div>
  </li>
);

export default CardItem;
