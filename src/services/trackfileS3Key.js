

const FileTrackerModel = require("../models/fileTracker.js") ;  


async function trackfileS3Key(id){

	return await FileTrackerModel.find({_id : id}).then(function(filetracker){
       console.log(filetracker);
       if(filetracker[0].filename === undefined) {
             throw new Error("File not found !! "); // this should never happen but just in case
       }     
        console.log("sending the filename");  
        return filetracker[0].filename ; 

     })
}
module.exports = trackfileS3Key;