const s3 = require('./S3_config.js');
const multer = require('multer');
var multerS3 = require('multer-s3');


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