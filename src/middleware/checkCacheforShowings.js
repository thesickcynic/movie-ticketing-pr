const redisClient = require('../config/connectToRedis').redisClient

const checkCache = async (req, res, next) => {
    const cityid = req.params.cityid;
    const theaterid = req.params.theaterid;
    const queryDate = new Date(
        +req.params.year,
        +req.params.month - 1,
        +req.params.day
    );
    const key = cityid + '_' + theaterid + '_' + queryDate;
    try {
        const value = await redisClient.get(key);
        const showings = JSON.parse(value);
        return res.status(200).send(showings);
    } catch {
        next();
    }
}

module.exports = checkCache