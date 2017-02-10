const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3030
const api_router = express.Router()


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5100')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.options('*', cors())

require('./routes/setup')(api_router)
require('./routes/accounts')(api_router)
require('./routes/minifinch')(api_router, io)

app.use('/api', api_router)

io.on('connection', (socket) => {
  io.emit('chat message', 'Hello world!')
})

app.get('*', (req, res) => {
  res.send('')
})

server.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`)
})