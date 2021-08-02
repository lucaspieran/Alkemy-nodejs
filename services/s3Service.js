require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})

//Uploads file
exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise();
}

//Downloads a file
exports.getFileStream = (fileKey) => {
  const downloadPramas = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME
  }

  return s3.getObject(downloadPramas).createReadStream();
}

exports.deleteImage = (fileKey) => {
  s3.deleteObject({
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME
  });
}
