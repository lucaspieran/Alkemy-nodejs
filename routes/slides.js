var express = require('express');
var router = express.Router();
const { getAllSlides, deleteSlide, getSlideById, updateSlide, createSlide } = require('../controllers/slides');
const { validJWT, hasRole } = require('../middlewares/users/auth');

//GET all slides
router.get('/', validJWT, hasRole('Admin'), getAllSlides); // As Admin
router.post('/', validJWT, hasRole('Admin'), createSlide); // As Admin
router.delete('/:id', validJWT, hasRole('Admin'), deleteSlide); // As Admin
router.get('/:id', validJWT, hasRole('Admin'), getSlideById); // As Admin
router.post('/:id', validJWT, hasRole('Admin'), updateSlide); // As Admin


module.exports = router;