const express = require('express')

const { getAllPosts } = require("./controllers/getAllPost");
const { getPostById, reactToPost } = require("./controllers/singlePost");
const { addPost } = require('./controllers/addPost');
const { updatePost } = require('./controllers/updatePost');
const { deletePost } = require('./controllers/deletePost');

const { getCategories } = require('./controllers/categories');
const { getTags } = require('./controllers/tags');
const { getAuthors } = require('./controllers/authors');

const {
  login,
  changePassword
} = require('./controllers/authController.js');

const {
  createComment,
  updateComment,
  deleteComment,
  adminDeleteComment,
  getCommentsByPost,
  getCommentUsers,
  resetCommentPassword
} = require('./controllers/commentController.js');

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

// Авторизация
router.post('/login', login);
router.post('/change-password', changePassword);
router.post('/comment/reset-password', resetCommentPassword);


// Комментарии
router.post('/post/:postId/comment', createComment);
router.get('/post/:postId/comments', getCommentsByPost);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);
router.delete('/admin/comment/:id', adminDeleteComment);

router.post('/post/:postId/react', reactToPost);
router.get('/admin/comment-users', getCommentUsers);



//swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// router.use('/api', swaggerUi.serve);
// router.get('/api', swaggerUi.setup(swaggerDocument));

module.exports = router