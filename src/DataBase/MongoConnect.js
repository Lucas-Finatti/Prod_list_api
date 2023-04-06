require('dotenv').config('../')

USER = process.env.USER
PASSWORD = process.env.PASSWORD


const mongoose = require ('mongoose')
const servermongo = `mongodb+srv://${USER}:${PASSWORD}@product.qb2cbi5.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(servermongo)
const db = mongoose.connection

module.exports = {db, mongoose}