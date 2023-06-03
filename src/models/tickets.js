const Sequelize = require("../config/connectToDB").sequalize;
const Datatypes = require('sequelize');

const Ticket = Sequelize.define('Ticket', {
    id: {
        type: Datatypes.BIGINT(),
        autoIncrement: true,
        primaryKey:true
    },
    price: {
        type: Datatypes.DECIMAL(5,2),
        allownull:false
    },
    Userid: {
        type: Datatypes.BIGINT()
    }
});

Ticket.associate = function(model) {
    Ticket.hasMany(model.Seatmap);
    Ticket.belongsTo(model.User);
}

module.exports = Ticket