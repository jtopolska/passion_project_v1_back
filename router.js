const express = require('express')
const { sendEmail } = require('./controllers/emailController')
const { saveCurrentRate, getCurrentRate } = require('./controllers/rateController');
const { getAllReviews, addReviews, deleteReviewById } = require("./controllers/reviewsController");
const { registration, login, resetPassword, refreshPassword } = require('./controllers/authController');
const router = express.Router();
const { check } = require('express-validator');

router.post('/registration',
    [check('login', 'Логин не может быть пустым!').notEmpty(),
    check('password', 'Пароль должен быть не меньше 5 и не больше 10 символов!').isLength({ min: 5, max: 10})], registration)
router.post('/login', login)
router.post('/reset-password', resetPassword)
router.post('/refresh-password', refreshPassword)

router.get('/rate', getCurrentRate);
router.post('/rate', saveCurrentRate);
router.post('/send-email', sendEmail);

router.get('/reviews', getAllReviews);
router.post('/reviews', addReviews);
router.delete('/reviews/:id', deleteReviewById);

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/api', swaggerUi.serve);
router.get('/api', swaggerUi.setup(swaggerDocument));

module.exports = router