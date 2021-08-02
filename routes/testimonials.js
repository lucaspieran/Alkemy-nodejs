var express = require('express');
var router = express.Router();
const { 
    paginationTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial } = require('../controllers/testimonials');
const  {createTestimonialValidation} = require('../middlewares/testimonials/createTestimonial');
const  {testimonialValidation} = require('../middlewares/testimonials/testimonialValidation');
const { 
    validJWT,
    hasRole
  } = require('../middlewares/users/auth');

router.get('/', paginationTestimonials);

router.post('/', validJWT, hasRole('Admin'), createTestimonialValidation,createTestimonial);
router.put('/:id', validJWT, hasRole('Admin'), testimonialValidation, updateTestimonial);
router.delete('/:id', validJWT, hasRole('Admin'), testimonialValidation, deleteTestimonial);


module.exports = router;