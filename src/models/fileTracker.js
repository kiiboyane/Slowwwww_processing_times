const mongoose = require("mongoose"); 
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
}) ; 


const  FileTracker = mongoose.model('fileTracker' , FileTrackerSchema);

module.exports = FileTracker  ; 