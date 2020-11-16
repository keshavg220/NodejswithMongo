const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'Items'

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
    console.log("db connected")
  })

module.exports = { init}
