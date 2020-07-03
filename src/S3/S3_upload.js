const s3 = require('./S3_config.js');
const multer = require('multer');
var multerS3 = require('multer-s3');




var limits = {
files: 1, // allow only 1 file per request
fileSize: 5 * 1024 * 1024, // (replace MBs allowed with your desires)
};

var upload = multer({
  storage: multerS3({
    limits: limits,
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

/*
var readStream = fs.createReadStream(fileName);  
var params = {Bucket: bucket, Key: key, Body: readStream};
Define how it is divided into parts (5KB), and the degree of concurrency (10):
var options = { partSize: 5 * 1024 * 1024, queueSize: 10 };  


var s3 = new AWS.S3({ httpOptions: { timeout: 10 * 60 * 1000 }});  
s3.upload(params, options)
Track progress:
.on('httpUploadProgress', function(evt) {  
   console.log('Completed ' +  
      (evt.loaded * 100 / evt.total).toFixed() +  
      '% of upload');  
})
On completion:
.send(function(err, data) {  
   console.log('Upload done');  
});

*/