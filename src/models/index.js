
const Sequelize = require("sequelize");
const sequelize = require("../config/connectToDB").sequalize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.City = require("./cities");
db.Movie = require("./movies");
db.Theater = require("./theaters");
db.Showing = require("./showings");

Object.keys(db).forEach(key => {
    if(db[key] && db[key].associate) {
        db[key].associate(db);
    }
});
console.log("Came here");
db.sequelize.sync({alter: true});
module.exports = db;