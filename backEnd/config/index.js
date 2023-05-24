'use strict'

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}

const env = process.env

module.exports = {
    host: env.HOST || 'localhost',
    port: env.PORT || 8080,
    db_connection: "mongodb+srv://CinemaPflofif:4WPFUbq9ewXdYvH3@cluster0.oadkx5w.mongodb.net/?retryWrites=true&w=majority"
}