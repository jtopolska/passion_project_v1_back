const express = require('express')

const { getAllPosts } = require("./controllers/getAllPost");
const { getSinglePost } = require("./controllers/singlePost");
const { addPost } = require('./controllers/addPost');
const { updatePost } = require('./controllers/updatePost');
const { deletePostById } = require('./controllers/deletePost');

const { getCategories } = require('./controllers/categories');
const { getTags } = require('./controllers/tags');
const { getAuthors } = require('./controllers/authors');

const router = express.Router();


router.get('/posts', getAllPosts);
router.get('/post/:id', getSinglePost);
// router.get('/admin/posts', getAllPosts); дублируется с 1
router.post('/admin/post', addPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePostById);

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