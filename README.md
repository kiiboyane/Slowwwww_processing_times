# Slowwwww_processing_times

# what is this ? 
Restful API with JWT Login/logout, cracking the zip files and tracking the operation progress with a limit of the jobs done simultaneously. 

# technical side : 

For the login part : there are two roles; a simple user and an admin; 
The admin can grant/revoke the admin role to a user, check all the users, control the limit for the job, meaning how many 
files can be cracked at the same time. 

Though the cracking part of the file is not implemented, the logic of recieving a file, uploading/downloading it to S3, tracking its status is already in place; 


All files are stored in S3; 
The users, filetrackers and the jobtracker collections are stored in MongoDB Atlas; 
The API on the other hand is hosted on an EC2 instance. 


# The upload process along with the cracking logic :

![alt text](https://github.com/kiiboyane/Slowwwww_processing_times/blob/master/upload_file%20(1).png)


