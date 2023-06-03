const Sequelize = require("../config/connectToDB").sequalize;
const moment = require('moment')
const {Op} = require('sequelize');
const City = require("../models/cities");
const Movie = require("../models/movies");
const Theater = require("../models/theaters");
const Showing = require("../models/showings");
const Seatmap = require("../models/seatMaps");
const Ticket = require("../models/tickets");

 exports.getAvailableSeats = async (showingId) => {
    try {
        const Seats = await Seatmap.findAll({
            raw: true,
            nest: true,
            /*
                Skip locked rows.
            */
            skipLocked: true,
            where: {
                showingId: showingId,
                isBooked: false
            }
        });
        return Seats;
    }
    catch (err) {
        console.log(err.message);
    }
}

exports.bookSeats = async (showingId, seatCount, seatList, userId) => {
    const t = await Sequelize.transaction();
    try {
        const seatListforBooking = await Seatmap.findAndCountAll({
            attributes: ['id', 'seatPrice'],
            transaction: t,
            raw: true,
            lock: true,
            skipLocked: true,
            where: {
                showingId: showingId,
                id: {
                    [Op.in] : seatList
                },
                isBooked: 0
            }
        })
        if(seatListforBooking.count !== seatCount) {
            throw new Error("Requested seats are not available");
        } else {
            let ticketPrice = 0;
            let seatIdsToBook = [];
            seatListforBooking.rows.forEach(seat => {
                ticketPrice += parseFloat(seat.seatPrice);
                seatIdsToBook.push(seat.id);
            });
            const newTicket = await Ticket.create({
                price: ticketPrice,
                Userid: userId
            },
            {transaction: t});
            console.log(newTicket.dataValues.id);
            await Seatmap.update({
                isBooked: true,
                TicketId: newTicket.dataValues.id,
            },
            {
                where: {
                    id: {
                        [Op.in]: seatIdsToBook
                    }
                },
                transaction: t
            }
            )
            await t.commit();
        }
    } catch (err) {
        await t.rollback();
        throw err;
    }
}