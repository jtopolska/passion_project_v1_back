const express = require('express')

const { getAllPosts } = require("./controllers/getAllPost");
const { getPostById } = require("./controllers/singlePost");
const { addPost } = require('./controllers/addPost');
const { updatePost } = require('./controllers/updatePost');
const { deletePost } = require('./controllers/deletePost');

const { getCategories } = require('./controllers/categories');
const { getTags } = require('./controllers/tags');
const { getAuthors } = require('./controllers/authors');

const router = express.Router();


router.get('/posts', getAllPosts);
router.get('/post/:id', getPostById);
// router.get('/admin/posts', getAllPosts); дублируется с 1
router.post('/post', addPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

// 📁 Категории
router.get('/categories', getCategories);
// router.post('/categories', addCategory);

// 🏷️ Теги
router.get('/tags', getTags);
// router.post('/tags', addTag);

// 👤 Авторы
router.get('/authors', getAuthors);
// router.post('/authors', addAuthor);


//swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// router.use('/api', swaggerUi.serve);
// router.get('/api', swaggerUi.setup(swaggerDocument));

module.exports = router