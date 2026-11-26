import { useState, useEffect } from 'react';

function App() {
  const [boots, setBoots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/boots')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load boots');
        }
        return response.json();
      })
      .then(data => setBoots(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>BootZone</h1>
      <h2>Football Boots</h2>

      {boots.map(boot => (
        <div key={boot._id}>
          <h3>{boot.name}</h3>
          <p>Brand: {boot.brand}</p>
          <p>Price: €{boot.price}</p>
          <p>Surface: {boot.surface}</p>
          <p>Colour: {boot.colour}</p>
          <p>{boot.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;