//const http = require('http');
const port = 3000;
const fs = require('fs');
const AWS = require('aws-sdk');
let ts = Date.now();
const app = require('express')();
const multer = require('multer');
const ejs = require('ejs');
const bodyParser  = require('body-parser');
const upload = multer();

require('dotenv').config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const fileName = 'test folder.zip';


const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'smart-flows-test', 
         Key: 'test folder-'+ts+'.zip', 
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

//uploadFile();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

//var upload = multer({ storage: storage });

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('recfile');

app.post('/upload', type, function (req,res) {

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  //var tmp_path = req.file.path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
 // var target_path = 'uploads/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
//  var src = fs.createReadStream(tmp_path);
 // var dest = fs.createWriteStream(target_path);
 // src.pipe(dest);
  //src.on('end', function() { res.render('complete'); });
  //src.on('error', function(err) { res.render('error'); });

});
/*app.post('/upload', upload.array(), function (req, res, next) {
  // req.files is array of uploaded files
  // req.body will contain the text fields, if there were any
  console.log("req.files ----------------- \n"); 
  console.log(req.files);
  console.log("req.body ------------------ \n"); 
  console.log(req.body); 
});
*/

 

app.get('/', function(req,rep){
	res.send("file upload program yazin :D ");
});
let server = app.listen(process.env.PORT || 3000 , function (){
  console.log("Good morning ! Ready for service")
}); 
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port,() => {
	console.log("Hi!");
});
*/


//set views file
/*app.set('views',path.join(__dirname,'views'));
      
//set view engine
app.set('view engine', 'ejs');

 
  
// For Multer Storage
var multerStorage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, path.join(__dirname,'my_uploads'));
    },
    filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
    }
});*/

/*// For Single File upload
var multerSigleUpload = multer({ storage: multerStorage });*/


/*
// getting a list of all filetrackers  
router.get('/filetrackers' , function(req , res , next){
  FileTracker.find({}).then(function(filetrackers){
        res.send(filetrackers); 
  });
}); 

//getting a file tracker using the ID
router.post('/filetracker/:id' , function(req , res , next){
   var query = { "_id" : req.params.id}  ; 
   FileTracker.find(query).then(function(filetracker){
      res.send(filetracker); 
   });
});

//adding a  new filetracker
router.get('/addfiletracker' , function(req , res , next){
   FileTracker.create(req.body).then(function(filetracker){
        res.send(filetracker);
   }).catch(next); 
  
}); */

//  Create a route to delete a filetracker though I don't see the use of it 


//update a filetracker 
/*router.put('/updatefiletracker/:id'  , function(req , res , next){
  console.log(req.params.id);
   FileTracker.findByIdAndUpdate({_id : req.params.id}, req.body).then(function(){
      FileTracker.findOne({_id : req.params.id}).then(function(filetracker){
            res.send(filetracker); 
        }); 
   }); 
}); */
