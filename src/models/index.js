
const Sequelize = require("sequelize");
const sequelize = require("../config/connectToDB").sequalize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.City = require("./cities");
db.Movie = require("./movies");
db.Theater = require("./theaters");
db.Showing = require("./showings");
db.Seatmap = require("./seatMaps");
db.Ticket = require("./tickets");
db.User = require("./users");

Object.keys(db).forEach(key => {
    if(db[key] && db[key].associate) {
        db[key].associate(db);
    }
});
// db.sequelize.sync({alter: true});
console.log("Came here");
module.exports = db;