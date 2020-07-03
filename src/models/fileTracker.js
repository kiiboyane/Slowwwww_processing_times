const mongoose = require("mongoose"); 
const validator = require('validator');
const Schema = mongoose.Schema ; 

 
const FileTrackerSchema = new Schema({
	password : String, 
	cracked : {
	   type: Number, 
	   min: 0, 
	   max: 2
	},
	filename: {
        type: String,
        required: true,
        trim: true
    },
    notificationmail: {
        type: String,
        required: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    }, 
}) ; 


const  FileTracker = mongoose.model('fileTracker' , FileTrackerSchema);

module.exports = FileTracker  ; 