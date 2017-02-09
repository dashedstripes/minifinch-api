const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3030
const api_router = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/setup')(api_router)
require('./routes/accounts')(api_router)

app.use('/api', api_router)

app.get('*', (req, res) => {
  res.send('')
})

app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`)
})