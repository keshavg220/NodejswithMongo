const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
var db ;
const { init } = require('./db')
const routes = require('./routes')
const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));
app.use(routes)
const server = http.createServer(app);
const port = process.env.PORT || 3000
init().then(() => {
console.log("database connected") 
})

 server.listen(port, function() {
  console.log('Express server running on *:' + port);
});


