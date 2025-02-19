const express = require('express')

const { getAllReviews } = require("./controllers/getAllReviews");
const { addReviews } = require('./controllers/addReview');
const { deleteReviewById } = require('./controllers/deleteReview');
const router = express.Router();


router.get('/reviews', getAllReviews);
router.post('/reviews', addReviews);
router.delete('/reviews/:id', deleteReviewById);

//swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// router.use('/api', swaggerUi.serve);
// router.get('/api', swaggerUi.setup(swaggerDocument));

module.exports = router