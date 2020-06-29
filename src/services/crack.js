const FileTrackerModel = require("../models/fileTracker.js") ;

async function crack(file , id){
     console.log("got the file"); 
     console.log(id); 
     await sleep(60000);
     	  console.log("the zip file with the id  " + id +" has been cracked ! ");
          FileTrackerModel.findByIdAndUpdate(
			    id,
			    {cracked : 1 , password : "Password" },
			    function(err, result) {
			      if (err) {
			        console.log(err);
			      } else {
			        console.log(result);
			      }
			    }
          );
     console.log("The cracking of the file finished !! yaay !!");
     return "Password"; 
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

module.exports = crack ; 