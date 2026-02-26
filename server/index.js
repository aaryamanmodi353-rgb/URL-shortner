require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbs.js');

const app = express();
connectDB();

app.use(cors()); // Crucial for frontend communication
app.use(express.json());

// Match these to your frontend axios calls
app.use('/api', require('./routes/url')); 
app.use('/', require('./routes/url')); 

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));