require('dotenv').config()
module.exports = {
    HOST: process.env.SQLSERVERHOST,
    USER: process.env.SQLSERVERUSER,
    PASSWORD: process.env.SQLSERVERPASSWORD,
    DB: process.env.DB,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };