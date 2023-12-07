
import React from 'react';

const DeckDisplay = ({ deck, cardList }) => {
  const downloadCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Card Name,Artist,Set,Color,Text,Image URL\n${deck
      .map((imageUrl, index) => {
        const card = cardList.find((card) => card.imageUrl === imageUrl);
        if (card) {
          return `${card.name},${card.artist || ''},${card.set || ''},${card.colors ? card.colors.join(', ') : 'N/A'},${card.text || ''},${imageUrl}`;
        }
        return '';
      })
      .join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'deck.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ flex: 1, marginLeft: '20px' }}>
      <h3 style={{ marginBottom: '10px' }}>Deck</h3>
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
        {deck.map((imageUrl, index) => (
          <li key={index} style={{ borderRadius: '8px', overflow: 'hidden', flex: '0 0 calc(25% - 3px)' }}>
            <img src={imageUrl} alt={`Card ${index + 1}`} style={{ width: 'auto', height: 'auto' }} />
          </li>
        ))}
      </ul>
      <button onClick={downloadCSV} style={{ marginTop: '10px', background: '#007bff', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none' }}>
        Export to CSV
      </button>
    </div>
  );
};

export default DeckDisplay;
