const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const uploadImgsService = require('./middlewares/uploadImgsService');
const errorHandler = require('./middlewares/errorHandler/errorHandler');

require('dotenv').config();
mongoose.set('strictQuery', false)
const PORT = process.env.port || 7000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

// Global error handler middleware is using after all routes and other middlewares
app.use(errorHandler); 

app.use('/uploads', express.static('uploads'));
app.use(uploadImgsService);

mongoose
	.connect(process.env.MONGO_LINK)
	.then(() => console.log("Connected to MONGODB"))
	.catch((err) => console.log("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
})