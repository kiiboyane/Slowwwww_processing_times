const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongooseConfig = require("./models/mongooseConfig.js") ; 


const app = express();

//set views file
app.set('views',path.join(__dirname,'views'));
      
//set view engine
app.set('view engine', 'ejs');
app.use("/", require("./routes/filetracker")); 



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

// the error handler middleware
app.use(function( err , req , res , next){
  // console.log(err.message.errors) ; 
    res.status(422).send({message : err.message});
});




 



 
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});