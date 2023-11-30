

const CardList = ({ cards }) => {
  // Use a map to store unique cards based on their name
  const uniqueCardsMap = new Map();
  
  // Iterate through the cards and add them to the map using the card's name as the key & check if it is in the map
  cards.forEach((card) => {
    if (!uniqueCardsMap.has(card.name)) {
      uniqueCardsMap.set(card.name, card);
    }
  });

  // Convert the map values to an array of unique cards
  const uniqueCards = Array.from(uniqueCardsMap.values());

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {uniqueCards.map((card) => (
          <li key={card.id}>
            <div>
              <strong>Name:</strong> {card.name} | <strong>Artist:</strong>{' '}
              {card.artist} | <strong>Set:</strong> {card.set} |{' '}
              <strong>Color:</strong> {card.colors ? card.colors.join(', ') : 'N/A'}
            </div>
            {card.imageUrl && (
              <img src={card.imageUrl} alt={card.name} style={{ width: '100px' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CardList;