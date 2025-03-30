const express = require('express')

const { getAllPosts } = require("./controllers/getAllPost");
const { getSinglePost } = require("./controllers/singlePost");
const { addPost } = require('./controllers/addPost');
const { updatePost } = require('./controllers/updatePost');
const { deletePostById } = require('./controllers/deletePost');
const router = express.Router();


router.get('/posts', getAllPosts);
router.get('/post/:id', getSinglePost);
router.get('/admin/posts', getAllPosts);
router.post('/admin/post', addPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePostById);

//swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// router.use('/api', swaggerUi.serve);
// router.get('/api', swaggerUi.setup(swaggerDocument));

module.exports = router