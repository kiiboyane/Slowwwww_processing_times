

const FileTrackerModel = require("../models/fileTracker.js") ; 
 


// creates a filetracker in Mongodb then return the filetracker
async function recieveFile(file , uploadStatus , mail){
	let id , 
        filetracker, 
        data = {cracked : 0 , filename : file.key}; 
        if(mail && mail !== undefined ) data.notificationmail = mail;
    await FileTrackerModel.create(data).then(function(element){
        uploadStatus = true;
        id = element._id;
        filetracker = element;
    })
    console.log(filetracker); 
    return filetracker; 
}
module.exports = recieveFile;