const Sequelize = require("../config/connectToDB").sequalize;
const moment = require('moment')
const {Op} = require('sequelize');
const {getAvailableSeats, bookSeats} = require('../service/bookingService')


exports.getAvailableSeats = async(req,res) => {
    try {
        const showingId = req.params.showingid;
        const Seats = await getAvailableSeats(showingId);
        console.log(Seats);
        return res.status(200).json(Seats);
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

exports.bookSeats = async(req,res) => {
    try{
        const showingId = req.body.showingId;
        const seatList = req.body.seatList;
        const seatCount = seatList.length;
        const userId = req.body.userId;
        await bookSeats(showingId, seatCount, seatList, userId);
        return res.status(200).json({message: "Tickets booked succesfully"});
    } catch(err) {
        console.log(err);
        console.log(req.body);
        return res.status(500).json({message: err.message});
    }
}