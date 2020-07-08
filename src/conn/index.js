const mongoose = require('mongoose')
const config = require('../../config/env')

const ambiente = process.env.NODE_ENV

// mongoose.Promise = Promise;
const options = {
  keepAlive: 300000,
  connectTimeoutMS: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  bufferMaxEntries: 0,
  poolSize: 5,
  useUnifiedTopology: true
}

const mongoUrl = `mongodb://${config[ambiente].MONGO_USER}:${config[ambiente].MONGO_PWD}@${config[ambiente].MONGO_HOST}:${config[ambiente].MONGO_PORT}/${config[ambiente].MONGO_DB}?authSource=${config[ambiente].MONGO_AUTH_SOURCE}&authMechanism=SCRAM-SHA-1`

const db = mongoose.createConnection(mongoUrl, options)

db.once('connected', () => {
  console.log('Mongodb connection', ambiente)
  return db
})

db.on('disconnected', () => {
  console.log('connection disconnected')
})

db.on('error', (err) => {
  console.log('Error in mongodb connection: ', err)
})

module.exports = db
