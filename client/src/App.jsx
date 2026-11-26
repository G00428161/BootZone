import { useState, useEffect } from 'react';

function App() {
  const [boots, setBoots] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newBoot, setNewBoot] = useState({
    name: '',
    brand: '',
    price: '',
    surface: '',
    colour: '',
    image: '',
    description: ''
});

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

  const handleEdit = (boot) => {
    setEditingId(boot._id);

    setNewBoot({
        name: boot.name,
        brand: boot.brand,
        price: boot.price,
        surface: boot.surface,
        colour: boot.colour || '',
        image: boot.image || '',
        description: boot.description || ''
    });
};

  const handleChange = (e) => {
    setNewBoot({
        ...newBoot,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const url = editingId
    ? `http://localhost:4000/api/boots/${editingId}`
    : 'http://localhost:4000/api/boots';

const response = await fetch(url, {
    method: editingId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBoot)
        });

        if (!response.ok) {
            throw new Error('Failed to add boot');
        }

        const savedBoot = await response.json();
       if (editingId) {
    setBoots(previousBoots =>
        previousBoots.map(boot =>
            boot._id === editingId ? savedBoot : boot
        )
    );
} else {
    setBoots(previousBoots => [...previousBoots, savedBoot]);
}

setEditingId(null);

        setNewBoot({
            name: '',
            brand: '',
            price: '',
            surface: '',
            colour: '',
            image: '',
            description: ''
        });

    } catch (error) {
        alert(error.message);
    }
};

  return (
    <div>
      <h1>BootZone</h1>
      <h2>Add a Football Boot</h2>

<form onSubmit={handleSubmit}>
    <input
        type="text"
        name="name"
        placeholder="Boot Name"
        value={newBoot.name}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={newBoot.brand}
        onChange={handleChange}
        required
    />

    <input
        type="number"
        name="price"
        placeholder="Price"
        value={newBoot.price}
        onChange={handleChange}
        step="0.01"
        min="0"
        required
    />

    <input
        type="text"
        name="surface"
        placeholder="Surface Type"
        value={newBoot.surface}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="colour"
        placeholder="Colour"
        value={newBoot.colour}
        onChange={handleChange}
    />

    <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newBoot.image}
        onChange={handleChange}
    />

    <textarea
        name="description"
        placeholder="Description"
        value={newBoot.description}
        onChange={handleChange}
    />

   <button type="submit">
    {editingId ? 'Update Boot' : 'Add Boot'}
</button>
</form>
      <h2>Football Boots</h2>

      {boots.map(boot => (
        <div key={boot._id}>
          <h3>{boot.name}</h3>
          <p>Brand: {boot.brand}</p>
          <p>Price: €{boot.price}</p>
          <p>Surface: {boot.surface}</p>
          <p>Colour: {boot.colour}</p>
          <p>{boot.description}</p>
          <button onClick={() => handleEdit(boot)}>
    Edit
</button>
        </div>
      ))}
    </div>
  );
}

export default App;