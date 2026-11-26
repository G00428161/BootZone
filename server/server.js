const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/bootzone/status', (req, res) => {
    res.json({ message: 'BootZone server is running' });
});

app.listen(port, () => {
    console.log(`BootZone server running on port ${port}`);
});