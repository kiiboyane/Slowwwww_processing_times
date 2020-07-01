const FileTrackerModel = require("../models/fileTracker.js") ;
const JobTrackerModel = require("../models/jobtracker.js") ;
const s3 = require('../S3/S3_config.js');


async function crack(filetracker){
    let  S3key = filetracker.filename , 
         id = filetracker._id,
         nextFiletoCracked,
         params,
         s3File,
         password="";  

     await JobTrackerModel.addFile(S3key , id);
     nextFiletoCraked = await JobTrackerModel.getNext();

     while(nextFiletoCraked !== undefined){
         // here normally I should get the file from S3  for the cracking process 
         params = {Bucket: 'smart-flows-test', Key: nextFiletoCraked.fileTrackerkey};
         S3File =  s3.getObject(params).createReadStream(); 
         S3key = nextFiletoCraked.fileTrackerkey;
         id = nextFiletoCraked.fileTrakerID;
         // cracking it here ; the file being cracked is not necessarly the one that triggered the function 
         await sleep(90000);

         FileTrackerModel.findByIdAndUpdate(
                    id,
                    {cracked : 1 , password : "Password" },
                    function(err, result) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(result);
                      }
                });
         
         // the current number should be decreased 
         console.log(" id  : " + id); 
         await JobTrackerModel.decreaseCount();
         // crack the next file 
          nextFiletoCraked = await JobTrackerModel.getNext();
     }
     return password; 
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

module.exports = crack ; 