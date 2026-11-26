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

app.post('/api/boots', async (req, res) => {
    try {
        const newBoot = new Boot(req.body);
        await newBoot.save();
        res.status(201).json(newBoot);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/boots/:id', async (req, res) => {
    try {
        const updatedBoot = await Boot.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBoot) {
            return res.status(404).json({ message: 'Boot not found' });
        }

        res.json(updatedBoot);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/boots/:id', async (req, res) => {
    try {
        const deletedBoot = await Boot.findByIdAndDelete(req.params.id);

        if (!deletedBoot) {
            return res.status(404).json({ message: 'Boot not found' });
        }

        res.json({ message: 'Boot deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`BootZone server running on port ${port}`);
});