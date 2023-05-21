const Sequelize = require("../config/connectToDB").sequalize;

const Datatypes = require('sequelize');

const Movie = Sequelize.define('Movie', {
    id: {
        type: Datatypes.BIGINT(),
        autoIncrement: true,
        primaryKey:true
    },
    movieName: {
        type: Datatypes.STRING(100),
        allowNull: false
    },
    movieLanguage: {
        type: Datatypes.STRING(100),
        allowNull: false
    },
    movie2DOR3d: {
        type: Datatypes.STRING(2),
        allowNull: false
    }
})

Movie.associate = function(models) {  
    Movie.hasMany(models.Showing);
};

module.exports = Movie