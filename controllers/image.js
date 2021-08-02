const s3Service = require('../services/s3Service');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');
const fs = require('fs');
const util  = require('util');
const unlinkFile = util.promisify(fs.unlink);


exports.getImage = async (req, res, next) => {
  try {
    const key = req.params.key;
    const readStream = s3Service.getFileStream(key);
    if (!readStream) {
      res.statusCode = statusCodes.NOT_FOUND;
      throw new Error(statusMessages.NOT_FOUND);
    }
    readStream.pipe(res);
  } catch (error) {
    error.status = res.statusCode || 500;
    next(error);
  }
}

exports.exampleUpload = async (req, res, next) => {
  try {
    const file = req.file;
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    res.json({
      imagePath: `/images/${result.key}`
    });
  } catch (error) {
    error.status = res.statusCode || 500;
    next(error);
  }
}

exports.deleteImage = async (req, res, next) => {
  try {
    const file = req.file;
    await s3Service.deleteImage(file);
    res.json({
      message: statusMessages.SUCCESS_DELETE
    });
  } catch (error) {
    error.status = res.statusCode || 500;
    next(error);
  }
}
