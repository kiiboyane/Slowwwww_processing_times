const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const fs = require('fs');

//route for single file upload
router.post("/singleFile", auth, upload.single('singleFile') , async(req, res) => {
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
router.get('/', auth, async(req, res) => {
    const uploadStatus = req.app.locals.uploadStatus;
    req.app.locals.uploadStatus = null;
    res.render('file_upload', { 
        title : 'File Upload Using Multer in Node.js and Express',
        uploadStatus : uploadStatus
    });
});
 

// tracking the file password 
router.get('/trackfile/:id', auth,async(req, res) =>{
     trackfileStatus(req.params.id)
     .catch(e => "File Not Found")
     .then( data => res.send(data)); 
});

router.get('/getfile/:id', auth, async(req, res) =>{
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
        //path = path .substring(2); 
        console.log(path); 
        return path;
    });

});


module.exports = router; 