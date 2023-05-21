const Sequelize = require("../config/connectToDB").sequalize;
const moment = require('moment')
const {Op} = require('sequelize');
const City = require("../models/cities");
const Movie = require("../models/movies");
const Theater = require("../models/theaters");
const Showing = require("../models/showings");

const sevenDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 7));

exports.getTheaters = async (req, res) => {
    try{
        const city = await City.findByPk(req.params.cityid, {
            include: {
                model: Theater,
                required: true,
                as: 'Theaters',
                attributes: ['id', 'theaterName']
            }
        });
        const theaterList = city.toJSON().Theaters;
        return res.status(200).json(theaterList);
    }
    catch(error) {
        return res.status(500).json({message: error.message});
    }
};

exports.getValidDates = async (req,res) => {
    try{
        const values = await City.findByPk(req.params.cityid, {
            include: {
                model: Theater,
                required: true,
                where: {
                    id: req.params.theaterid
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
        const uniqueDates = Array.from(new Set(theaterDates.map((date) => new Date(date.showingDate).toDateString())));
        return res.status(200).json(uniqueDates);
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
        //Since we have to compare with the Calendar Date and not the exact time-stamps
        const beginningOfQueryDate = moment(queryDate, 'YYYY-MM-DD').startOf('day');
        const endOfQueryDate = moment(queryDate, 'YYYY-MM-DD').endOf('day');

        const values = await City.findByPk(req.params.cityid, {
            include: {
                model: Theater,
                required: true,
                attributes: ['theaterName'],
                where: {
                    id: req.params.theaterid
                },
                include : [{
                    model: Showing, 
                    required:true,
                    attributes: ['showingAudio', 'showingSubtitleLanguage', 'showingDate'],
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
                        attributes:['movieName', 'movieLanguage', 'movie2DOR3D']
                    }]
                }]
            }
        });
        const movies = values.toJSON();
        return res.status(200).json(movies);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
    
}
// module.exports = getTheaters;