const express = require('express');
const movieRoute = require('../src/routes/moviesRoute');
const {connectToDB, sequalize} = require('../src/config/connectToDB');
const connectToRedis = require('../src/config/connectToRedis').connectToRedis;
const db = require('../src/models/index.js');
const bodyParser = require('body-parser');
console.log(require('dotenv').config());
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = 3000;

app.use('/api',movieRoute);
app.get('/', (request, response) => {
    response.status(200).json({message: 'Hello World!'});
  });
app.use(express.json());
app.listen(PORT, async () => {
    console.log('Server is running at http://localhost:${PORT}');
    await connectToDB();
    await connectToRedis();
});