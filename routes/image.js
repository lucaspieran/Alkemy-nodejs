const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image');
const { getImageValidation} = require('../middlewares/images/imagesMiddleware');
const { upload } = require('../config/multer');

router.post('/', upload.single('image'),imageController.exampleUpload);

router.get('/:key', getImageValidation,imageController.getImage);

router.get('/delete/:key', imageController.deleteImage);

module.exports = router;
