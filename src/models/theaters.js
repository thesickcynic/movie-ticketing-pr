const Sequelize = require("../config/connectToDB").sequalize;
const Datatypes = require('sequelize');

const Theater = Sequelize.define('Theater', {
    id: {
        type: Datatypes.BIGINT(),
        autoIncrement: true,
        primaryKey:true
    },
    theaterName: {
        type: Datatypes.STRING(100),
        allowNull: false
    }
});

Theater.associate = function(models) {  
    Theater.hasMany(models.Showing);
    Theater.belongsTo(models.City);
};

module.exports = Theater