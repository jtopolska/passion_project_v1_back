const express = require('express')
const app = express()
const routes = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')
const uploadImgsService = require('./service/uploadImgsService');

require('dotenv').config()
const PORT = process.env.port || 7000

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.use('/uploads', express.static('uploads'));
app.use(uploadImgsService);


app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})