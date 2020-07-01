# Slowwwww_processing_times

# what is this ? 
Restful API with JWT Login/logout, cracking the zip files and tracking the operation progress with a limit of the jobs done simultaneously. 

# technical side : 

For the login part : there are two roles; a simple user and an admin; 

The admin can grant/revoke the admin role to a user, check all the users, control the limit for the job, meaning how many 
files can be cracked at the same time. 

Though the cracking part of the file is not implemented, the logic of recieving a file, uploading/downloading it to S3, tracking its status is already in place; 


* All files are stored in S3; 
* The users, filetrackers and the jobtracker collections are stored in MongoDB Atlas; 
* The API on the other hand is hosted on an EC2 instance. 


# The upload process along with the cracking logic :

![alt text](https://github.com/kiiboyane/Slowwwww_processing_times/blob/master/upload_file.png)

# Routers - Requests  :
The EC2 IP address is 18.212.146.244
You will need to create a user before testing the requests.
* src/routers/user.js has all the requests for the user creation and login. 
* To test using a profile, make sure you include the token sent back with the login response, whithin the header : 
         ```
         Authorisation Bearer <token>
         ```
* src/routes/filetracker.js is for the routers related to the file. 
* POST /singleFile is the request responsible on sending the zip file to the server; The file should be sent under the name singleFile whithin a form-data body. 
* POST /singleFile sends back Json body with the id; keep that for further tracking. 
* GET  /getfile/:id sends the file to be downloaded, the response is in the header key Content-Disposition , if you are using postman just use "send and download" instead of the "send" button. 
* GET /trackfile/:id sends back a Json body  with the status of the cracking  and the password . the cracking function on its own takes 90 seconds; it might take longer if 
  the queue is not empty and it surpasses the limit number . 
TBC


