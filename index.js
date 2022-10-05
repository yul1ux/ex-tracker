const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const connect = require('./src/db')
const routes = require('./src/routes')
require('dotenv').config()

connect()
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use('/api',routes)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
