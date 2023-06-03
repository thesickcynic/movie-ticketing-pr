const Sequelize = require("../config/connectToDB").sequalize;
const moment = require('moment')
const {Op} = require('sequelize');
const City = require("../models/cities");
const Movie = require("../models/movies");
const Theater = require("../models/theaters");
const Showing = require("../models/showings");
const writeToCache = require("../service/writeToCache").writeToCache;
const {getTheaters, getValidDates, getShowingsByTheaterAndDate} = require("../service/movieService");

exports.getTheaters = async (req, res) => {
    try{
        const cityid = req.params.cityid;
        const theaterList = await getTheaters(cityid);
        return res.status(200).json(theaterList);
    }
    catch(error) {
        return res.status(500).json({message: error.message});
    }
};

exports.getValidDates = async (req,res) => {
    try{
        const cityid = req.params.cityid;
        const theaterid = req.params.theaterid;
        const validDates = await getValidDates(cityid, theaterid);
        return res.status(200).json(validDates);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
    
}

exports.getShowingsByTheaterAndDate = async (req,res) => {
    try{
        const queryDate = new Date(
            +req.params.year,
            +req.params.month - 1,
            +req.params.day
        )
        const cityid = req.params.cityid;
        const theaterid = req.params.theaterid;

        const movies = await getShowingsByTheaterAndDate(cityid, theaterid, queryDate);
        return res.status(200).json(movies);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
    
}
