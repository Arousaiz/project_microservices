const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const redis = require('redis');
const app = express();
const tasksRoutes = require('./routes/tasksRoutes');

app.disable('x-powered-by');
app.use(helmet())
app.use(cors());
app.use(express.json());
app.use('/', tasksRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});