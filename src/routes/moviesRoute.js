const express = require('express')
const movieRouter = express.Router();
const movieController = require('../controllers/movieController');
const movieBookingController = require('../controllers/bookingController');
const checkCacheforShowings = require('../middleware/checkCacheforShowings')

movieRouter.get('/city/:cityid', movieController.getTheaters);
movieRouter.get('/city/:cityid/theater/:theaterid', movieController.getValidDates);
movieRouter.get('/city/:cityid/theater/:theaterid/date/:year-:month-:day', checkCacheforShowings, movieController.getShowingsByTheaterAndDate);

movieRouter.get('/getSeats/:showingid', movieBookingController.getAvailableSeats);
movieRouter.post('/bookSeats', movieBookingController.bookSeats);
module.exports = movieRouter;