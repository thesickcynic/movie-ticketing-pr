const redisClient = require('../config/connectToRedis').redisClient

exports.writeToCache = async (keyData, valueData) => {
    const key = keyData.cityid + '_' + keyData.theaterid + '_' + keyData.queryDate;
    const value = JSON.stringify(valueData);
    try{
        await redisClient.set(key, value, {EX: 60 * 5}) ;
        console.log("Wrote to cache succesfully")
    } 
    catch (err){
        console.log(err);
    }
}