const Sequelize = require("../config/connectToDB").sequalize;
const Datatypes = require('sequelize');

const Seatmap = Sequelize.define('Seatmap', {
    id: {
        type: Datatypes.BIGINT(),
        autoIncrement: true,
        primaryKey:true
    },
    rowNumber: {
        type: Datatypes.BIGINT(),
        allowNull:false
    },
    seatNumber: {
        type: Datatypes.BIGINT(),
        allowNull:false
    },
    seatPrice: {
        type: Datatypes.DECIMAL(6, 2),
        allowNull: false
    },
    isBooked: {
        type: Datatypes.BOOLEAN(),
        allowNull: false,
        default: true
    },
    TicketId: {
        type: Datatypes.BIGINT()
    }
});

Seatmap.associate = function(models) {
    Seatmap.belongsTo(models.Showing);
    Seatmap.belongsTo(models.Ticket);
}

module.exports = Seatmap