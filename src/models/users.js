const Sequelize = require("../config/connectToDB").sequalize;
const Datatypes = require('sequelize');

const User = Sequelize.define('User', {
    id: {
        type: Datatypes.BIGINT(),
        autoIncrement: true,
        primaryKey: true
    },
    userFirstName: {
        type: Datatypes.STRING(),
        allowNull: false
    },
    userSecondName: {
        type: Datatypes.STRING(),
        allowNull: true
    },
    userEmail: {
        type: Datatypes.STRING(),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    userPhone: {
        type: Datatypes.STRING(),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    }
});

User.associate = function(model) {
    User.hasMany(model.Ticket);
}

module.exports = User