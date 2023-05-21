const Sequalize = require('sequelize');
const dbConfig = require("./db.config");
// Syntax for setting up a new connection 
// Sequalize (database_name, user_name, password, {dialect: database, host: host})

const sequalize = new Sequalize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
});

// Check the connection to database - calling authenticate method

const connectToDB = async ()=>{
	try{
		await sequalize.authenticate();
        console.log("Successfully connected to the database.");
	}
	catch(error){
		console.log(error);
	}
};


module.exports = {connectToDB, sequalize};