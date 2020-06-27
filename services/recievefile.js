

const FileTrackerModel = require("../models/fileTracker.js") ; 
const crack = require("./crack.js") ; 


async function recieveFile(file , uploadStatus){
	let id ; 
    await FileTrackerModel.create({cracked : 0 , filename : file.key}).then(function(filetracker){
        console.log(filetracker);
        uploadStatus = true;
        id = filetracker._id;
        console.log("this is the id of the file in recieveFile " + id);
    })
    .then(function(){
          crack(file , id);
    });
    return id; 
}
module.exports = recieveFile;