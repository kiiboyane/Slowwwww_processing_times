

const FileTrackerModel = require("../models/fileTracker.js") ; 
 


// creates a filetracker in Mongodb then return the filetracker
async function recieveFile(file , uploadStatus){
	let id , 
        filetracker; 
    await FileTrackerModel.create({cracked : 0 , filename : file.key}).then(function(element){
        uploadStatus = true;
        id = element._id;
        filetracker = element;
    })
    console.log(filetracker); 
    return filetracker; 
}
module.exports = recieveFile;