const redis = require('redis')

let client;

const connectRedis = async () => {
    client = redis.createClient()

    client.on('connect', () => {
        console.log('Redis connected')
    })

    client.on('error', (err) => {
        console.log('Redis error', err)
    })

    await client.connect()
}

const getRedisClient = () => {
    if(!client){
        throw new Error('Redis client is not connected.')
    }
    return client;
}

module.exports = {connectRedis, getRedisClient}