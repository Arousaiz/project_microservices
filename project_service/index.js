const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const app = express();
const projectsRoutes = require('./routes/projectsRoutes');

app.disable('x-powered-by');
app.use(helmet())
app.use(cors());
app.use(express.json());
app.use('/', projectsRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});