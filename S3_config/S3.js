const AWS = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');

require('dotenv').config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smart-flows-test',
    metadata: function (req, file, cb) {
      console.log(" S3 multer config " + file.fieldname);
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.fieldname + '-' +Date.now().toString()+'.zip');
    }
  })
});

module.exports = upload; 