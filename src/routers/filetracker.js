const express = require('express');
const router = express.Router(); 
const upload = require("../S3/S3_upload.js") ; 
const download = require("../S3/S3_download.js") ; 
const recieveFile = require("../services/recievefile.js") ;
const trackfileStatus = require("../services/trackfileStatus.js") ;
const trackfileS3Key = require("../services/trackfileS3Key.js") ;
const auth = require("../middleware/auth");
const crack = require("../services/crack.js") ;
const sendmail = require("../services/mailSender.js") ;
const fs = require('fs');


process.on('uncaughtException', function (err) {
  console.log("Uncaught Exception:", err);
  process.exit(1);  // This is VITAL. Don't swallow the err and try to continue.
});
//route for single file upload
router.post("/singleFile", auth, upload.single('singleFile') , async(req, res ,next) => {
    const file = req.file;
    const email = req.user.email; 
    let id;
    console.log(file) ;
    if (!file) {
        return res.end("Please choose file to upload!");
    }
    recieveFile(req.file, req.app.locals.uploadStatus ,email ).then((filetracker) => {
          console.log("ready to send the filetracker to FE  !");  
          res.send({
               filetracker : filetracker,
               message : "the file has been upload successfully ! "
          });
          return filetracker;
    }).then(filetracker => crack(filetracker));   
});

router.post("/testmail", auth, async(req, res ,next) => {
    const mail =  req.user.email;
    console.log("to " + mail);
    sendmail(mail, "5efe4095602ae7960c8bdcb9"); 
});
// Base index route
router.get('/', auth, async(req, res) => {
    const uploadStatus = req.app.locals.uploadStatus;
    req.app.locals.uploadStatus = null;
    res.send({
            message :"Sloooowww processing times"
    });
});
 

// tracking the file password 
router.get('/trackfile/:id', auth,async(req, res) =>{
     trackfileStatus(req.params.id)
     .catch(e => "File Not Found")
     .then( data => res.send(data)); 
});

router.get('/getfile/:id', auth, async(req, res) =>{
    trackfileS3Key(req.params.id)
    .catch(e => "File not found !! ")
    .then((key) => download(key))
    .catch(e => "File not found !! "
    )
    .then(function(data){
          if(data ===  "File not found !! ") 
                res.send({message : data}); 
          else{
               console.log(" got the path") ;
               //res.download(path)
               //set the archive name
               console.log(data);
              res.attachment(data[1]);

       //this is the streaming magic
        data[0].pipe(res);
          }
     //   console.log(path); 
        return data;
    });

});


module.exports = router; 