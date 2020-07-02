const express = require('express');
const router = express.Router(); 
const auth = require("../middleware/auth");
const Jobtracker = require("../models/jobtracker.js") ;
const fs = require('fs');


process.on('uncaughtException', function (err) {
  console.log("Uncaught Exception:", err);
  process.exit(1);  // This is VITAL. Don't swallow the err and try to continue.
});
//route for single file upload
router.get("/changelimit/:newlimit", auth, async(req, res ,next) => {
    let newlimit = req.params.newlimit;
    const user = req.user; 
    if(!user.admin){
         return res.end({ message : "You are not authorized" });
    }
    newlimit = parseInt(newlimit,10);
    console.log( newlimit);
    if (!newlimit || newlimit<1  || typeof newlimit != "number") {
        return res.end("Please choose a valid number above 1!");
    }
   Jobtracker.updateLimit(newlimit)
   .then(data => res.send(data));
});
//route for single file upload
router.get("/getjobtracker", auth, async(req, res ,next) => {
    const user = req.user; 
    let current = 0 ; 
    if(!user.admin){
         return res.end({ message : "You are not authorized" });
    }

   Jobtracker.getJobTracker()
   .then(data => res.send(data));
});




module.exports = router; 