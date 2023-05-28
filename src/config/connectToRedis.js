const createClient = require('redis').createClient
const redisClient = createClient();

const connectToRedis = async () =>  {
    try {
        await redisClient.connect();
        console.log('Connected to Redis succesfully');
    } 
    catch (err) {
        console.log(err.message);
    }
    
}


module.exports = {connectToRedis, redisClient};