const s3 = require('./S3_config.js');
const multer = require('multer');
var multerS3 = require('multer-s3');
const fs = require("fs"); 




function checkPath(filename){
  let parts = filename.split('.'),
      nameinvalid = true,
      count = 0, 
      validname = parts[0];   
  console.log("filename  : "  + parts[0] + "  extension : " + parts[1] );
  while(nameinvalid){
    if(count === 0 ){
         if(fs.existsSync('./downloads/'+validname + '.'+ parts[1])){
               count++;
         }else{
            nameinvalid = false;
         }
    }else{
        if(fs.existsSync('./downloads/'+validname +'(' + count + ').'+parts[1])){
               count++;
         }else{
            nameinvalid = false;
            validname = validname +'(' + count + ')';
         }
    }
  }

  return validname+'.'+parts[1]; 


}
//'singleFile-1593294970455.zip'
function download (filename){
  if(typeof filename !== 'string' || filename == "File not found !! ")
        throw new Error("File not found !! ");
  var params = {Bucket: 'smart-flows-test', Key: filename};
  var validname  = checkPath(filename);
  var file = require('fs').createWriteStream('./downloads/'+validname);
  var s3File = s3.getObject(params).createReadStream().pipe(file); 
  console.log(validname);
  return './downloads/' +validname;
}
module.exports = download; 