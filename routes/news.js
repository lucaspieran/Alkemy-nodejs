const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer');
const {
  allNews,
  postNews,
  updateNews,
  deleteNews,
  getNewsId,
} = require('../controllers/news');
const CommentsController = require('../controllers/comments');

const { validJWT, hasRole } = require('../middlewares/users/auth');
const {
  uploadNewsValidation,
  updateNewsValidation,
} = require('../middlewares/news/newsMiddleware');

router.get('/', allNews);

router.get('/:id', validJWT, hasRole('Admin'), getNewsId);

router.get('/:news_id/comments', CommentsController.getCommentByNews);

router.post(
  '/',
  validJWT,
  hasRole('Admin'),
  upload.single('image'),
  uploadNewsValidation,
  postNews
);

router.put('/:id', validJWT, hasRole('Admin'), updateNewsValidation, updateNews);

router.delete('/:id', validJWT, hasRole('Admin'), deleteNews);

module.exports = router;
