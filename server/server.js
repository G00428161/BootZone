const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Boot = require('./models/Boot');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err.message));

app.get('/api/bootzone/status', (req, res) => {
    res.json({ message: 'BootZone server is running' });
});

app.get('/api/boots', async (req, res) => {
    try {
        const boots = await Boot.find();
        res.json(boots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`BootZone server running on port ${port}`);
});