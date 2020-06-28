

const FileTrackerModel = require("../models/fileTracker.js") ;  


async function trackfileStatus(id){
	let data  = {};
    await FileTrackerModel.find({_id : id}).then(function(filetracker){
		  // either  the zip file is already cracked so the value is set to 1
		  if(filetracker[0].cracked === 1 ){
                   data.message = "The file has been cracked ! ";
                   data.password = filetracker[0].password;
		  }else{// the file is still not cracked yet ( ongoing or waiting ) 
		  	    data.message = "The file is not ready yet! Please wait for the operation to finish"; 
		  }
	});
    return data; 
}
module.exports = trackfileStatus;