const Sequelize = require("../config/connectToDB").sequalize;
const Datatypes = require('sequelize');

const City = Sequelize.define('City', {
    id: {
        type: Datatypes.BIGINT(),
        autoIncrement: true,
        primaryKey:true
    },
    cityName: {
        type: Datatypes.STRING(100),
        allowNull: false
    }
})
City.associate = function(models) {  
    City.hasMany(models.Theater);
};
module.exports = City