const express = require('express');
const movieRoute = require('../src/routes/moviesRoute');
const {connectToDB, sequalize} = require('../src/config/connectToDB');
const db = require('../src/models/index.js');
// const dotenv = require('dotenv').config({path: '../process.env'})
console.log(require('dotenv').config());
const app = express();
const PORT = 3000;

app.use('/api',movieRoute);
app.get('/', (request, response) => {
    response.status(200).json({message: 'Hello World!'});
  });
app.use(express.json());
app.listen(PORT, async () => {
    console.log('Server is running at http://localhost:${PORT}');
    await connectToDB();
});