const redis = require('redis');
let client;
module.exports = () => {
    if (client) return client;
    client = redis.createClient(); //creates a new client with default port 6379
    client.on('connect', function () {
        console.log('connected to redis at 6379');
    });
    return client;
}