const express = require('express');
const router = express.Router(); 
const Multerupload = require("../S3_config/S3.js") ; 
const recieveFile = require("../services/recievefile.js") ;
const trackfile = require("../services/trackfile.js") ;

//route for single file upload
router.post("/singleFile",Multerupload.single('singleFile') , function(req, res) {
    const file = req.file;
    let id; 
    if (!file) {
        return res.end("Please choose file to upload!");
    }
    recieveFile(req.file, req.app.locals.uploadStatus).then((id) => {
          console.log("test service " +id);  
          res.send({
               id : id , 
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
     trackfile(req.params.id)
     .then( data => res.send(data)); 
});


module.exports = router; 