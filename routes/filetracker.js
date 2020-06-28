const express = require('express');
const router = express.Router(); 
const upload = require("../S3/S3_upload.js") ; 
const download = require("../S3/S3_download.js") ; 
const recieveFile = require("../services/recievefile.js") ;
const trackfileStatus = require("../services/trackfileStatus.js") ;
const trackfileS3Key = require("../services/trackfileS3Key.js") ;
const fs = require('fs');

//route for single file upload
router.post("/singleFile",upload.single('singleFile') , function(req, res) {
    const file = req.file;
    let id; 
    if (!file) {
        return res.end("Please choose file to upload!");
    }
    recieveFile(req.file, req.app.locals.uploadStatus).then((id) => {
          console.log("test service " +id);  
          res.send({
               id : id, 
               message : "the file has been upload successfully ! "
          });
    });    
});

// Base index route
router.get('/', function(req, res) {
    const uploadStatus = req.app.locals.uploadStatus;
    req.app.locals.uploadStatus = null;
    res.render('file_upload', { 
        title : 'File Upload Using Multer in Node.js and Express',
        uploadStatus : uploadStatus
    });
});
 

// tracking the file password 
router.post('/trackfile/:id', function(req, res){
     trackfileStatus(req.params.id)
     .then( data => res.send(data)); 
});

router.post('/getfile/:id', function(req, res){
   //  var key ; 
    trackfileS3Key(req.params.id)
    .catch(e => "File not found !! ")
    .then((key) => download(key))
    .catch(e => "File not found !! "
    )
    .then(function(path){
          if(path ===  "File not found !! ") 
                res.send({message : path}); 
          else{
               res.download(path)
          }
        return path;
    })
    .then(path => fs.unlink(path, function (err) {
          if (err) throw err;
          // to not keep it locally; 
          console.log('File deleted!');
    }))
    .catch(err => "");

});


module.exports = router; 