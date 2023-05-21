const express = require('express')
const movieRouter = express.Router();
const movieController = require('../controllers/movieController');

movieRouter.get('/city/:cityid', movieController.getTheaters);
movieRouter.get('/city/:cityid/theater/:theaterid', movieController.getValidDates);
movieRouter.get('/city/:cityid/theater/:theaterid/date/:year-:month-:day', movieController.getShowingsByTheaterAndDate);

module.exports = movieRouter;