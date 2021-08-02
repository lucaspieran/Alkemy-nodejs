var express = require('express');
var router = express.Router();

const CommentsController = require('../controllers/comments');
const { createCommentMiddleware, updateCommentMiddleware, deleteCommentMiddleware} = require('../middlewares/comments/commentMiddleware');
const { hasRoleOrOwnership, validJWT, hasRole } = require('../middlewares/users/auth');

router.get('/', validJWT, hasRole('Admin'), CommentsController.getComments);

router.get('/:id', CommentsController.getCommentById);

router.post('/', createCommentMiddleware,CommentsController.postComment);

router.put('/:id', validJWT,hasRoleOrOwnership,updateCommentMiddleware, CommentsController.updateComment);

router.delete('/:id', validJWT,hasRoleOrOwnership,deleteCommentMiddleware,CommentsController.deleteComment);

module.exports = router;