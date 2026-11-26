import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const navigate = useNavigate();
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
    axios.get('http://localhost:4000/api/boots')
        .then(response => setBoots(response.data))
        .catch(error => console.log(error));
}, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this boot?')) {
        return;
    }

    try {
        await axios.delete(`http://localhost:4000/api/boots/${id}`);

        setBoots(previousBoots =>
            previousBoots.filter(boot => boot._id !== id)
        );
    } catch (error) {
        alert(error.message);
    }
};

  const handleEdit = (boot) => {
    navigate('/add');
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
     let response;

if (editingId) {
    response = await axios.put(
        `http://localhost:4000/api/boots/${editingId}`,
        newBoot
    );
} else {
    response = await axios.post(
        'http://localhost:4000/api/boots',
        newBoot
    );
}

const savedBoot = response.data;
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
navigate('/boots');
    } catch (error) {
        alert(error.message);
    }
};

  return (
    <div>
      <nav className="navbar">
    <div className="logo">BOOT<span>ZONE</span></div>

<div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/boots">Football Boots</Link>
    <Link to="/add">Add Boot</Link>
</div>
</nav>

<Routes>
    <Route path="/" element={
<section className="hero-section">
    <div className="hero-content">
        <span className="hero-tag">BUILT FOR THE GAME</span>

        <h1>Find Your Perfect Football Boots.</h1>

        <p>
            Discover football boots for every player,
            every surface and every style of play.
        </p>

   <Link to="/boots" className="hero-button">
    Explore Boots
</Link>
    </div>
</section>
    } />



    <Route path="/add" element={
        <div>
      <h2 id="add-boot">
    {editingId ? 'Edit Football Boot' : 'Add a Football Boot'}
</h2>

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
        </div>
    } />


    <Route path="/boots" element={
        <div>
    <h2 id="boots">Football Boots</h2>

<div className="boots-grid">
      {boots.map(boot => (
     <div key={boot._id} className="boot-card">
        {boot.image && (
    <img
        src={boot.image}
        alt={boot.name}
        className="boot-image"
    />
)}
          <h3>{boot.name}</h3>
          <p>Brand: {boot.brand}</p>
          <p>Price: €{boot.price}</p>
          <p>Surface: {boot.surface}</p>
          <p>Colour: {boot.colour}</p>
          <p>{boot.description}</p>
          <button onClick={() => handleEdit(boot)}>
    Edit
</button>
<button onClick={() => handleDelete(boot._id)}>
    Delete
</button>
        </div>
       ))}
        </div>
        </div>
    } />
</Routes>
    </div>
  );
}

export default App;