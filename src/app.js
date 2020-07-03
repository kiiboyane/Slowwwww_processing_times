const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
require('./db/db'); 



const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({limit: '5mb'}));
/*//set view engine
app.set('view engine', 'ejs');*/
app.use("/", require("./routers/filetracker")); 
app.use("/", require("./routers/jobtracker")); 
app.use("/", require("./routers/user")); 

/*app.use(function(req, res, next){
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  };
});*/

// the error handler middleware
app.use(function( err , req , res , next){
    res.status(422).send({message : err.message});
});
 
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});