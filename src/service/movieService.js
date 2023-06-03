const Sequelize = require("../config/connectToDB").sequalize;
const moment = require('moment')
const {Op} = require('sequelize');
const City = require("../models/cities");
const Movie = require("../models/movies");
const Theater = require("../models/theaters");
const Showing = require("../models/showings");
const writeToCache = require("../service/writeToCache").writeToCache;

const sevenDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 7));

exports.getTheaters = async (cityid) => {
    try{
        const city = await City.findByPk(cityid, {
            include: {
                model: Theater,
                required: true,
                as: 'Theaters',
                attributes: ['id', 'theaterName']
            }
        });
        const theaterList = city.toJSON().Theaters;
        return theaterList;
    }
    catch(error) {
        throw error;
    }
};

exports.getValidDates = async (cityid, theaterid) => {
    try{
        const values = await City.findByPk(cityid, {
            include: {
                model: Theater,
                required: true,
                where: {
                    id: theaterid
                },
                include : [{
                    model: Showing, 
                    required:true,
                    attributes: ['id', 'showingDate'],
                    where: {
                        showingDate: {
                            [Op.gte]: new Date(),
                            [Op.lte]: sevenDaysFromNow
                        }
                    },
                    order: [
                        ['showingDate', 'ASC']
                    ]
                }]
            }
        });
        const theaterDates = values.toJSON().Theaters[0].Showings;
        /*
        Getting only the distinct dates.
        */
        const uniqueDates = Array.from(new Set(theaterDates.map((date) => new Date(date.showingDate).toDateString())));
        return uniqueDates;
    }
    catch(error){
        throw error;
    }
    
}

exports.getShowingsByTheaterAndDate = async (cityid, theaterid, queryDate) => {
    try{
        /*
            Since we have to compare with the Calendar Date and not the exact time-stamps
        */
        const beginningOfQueryDate = moment(queryDate, 'YYYY-MM-DD').startOf('day');
        const endOfQueryDate = moment(queryDate, 'YYYY-MM-DD').endOf('day');

        const values = await City.findByPk(cityid, {
            include: {
                model: Theater,
                required: true,
                attributes: ['theaterName'],
                where: {
                    id: theaterid
                },
                include : [{
                    model: Showing, 
                    required:true,
                    attributes: ['id','showingAudio', 'showingSubtitleLanguage', 'showingDate'],
                    where: {
                        showingDate: {
                            [Op.gte]: beginningOfQueryDate,
                            [Op.lte]: endOfQueryDate
                        }
                    },
                    order: [
                        ['showingDate', 'ASC']
                    ], 
                    include: [{
                        model: Movie,
                        attributes:['movieName', 'movieLanguage', 'movieExperience']
                    }]
                }]
            }
        });
        const movies = values.toJSON();
        const writeToCacheKey = {
            cityid: req.params.cityid,
            theaterid: req.params.theaterid,
            queryDate: queryDate,
        }
        writeToCache(writeToCacheKey, movies);
        return movies;
    }
    catch(error){
        throw error;
    }
    
}
