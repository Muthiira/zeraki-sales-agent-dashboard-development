import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Collections = ({ schoolId }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/collections/${schoolId}`)
      .then(response => setCollections(response.data))
      .catch(error => console.error('Error fetching collections:', error));
  }, [schoolId]);

  const handleMarkCollection = (collectionId, status) => {
    // Implement collection status update logic
  };

  return (
    <div>
      <h2>Collections</h2>
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            Collection Number: {collection.collectionNumber} - Date: {collection.date} - Amount: {collection.amount}
            <button onClick={() => handleMarkCollection(collection.id, 'Valid')}>Mark Valid</button>
            <button onClick={() => handleMarkCollection(collection.id, 'Bounced')}>Mark Bounced</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collections;
