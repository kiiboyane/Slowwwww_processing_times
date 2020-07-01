const mongoose = require('mongoose')
const Schema = mongoose.Schema ; 

const JobtrackerSchema = Schema({
    current : { // identifyng how many are being processed now 
        type: Number,
        min : 0, 
        default: 0
    },
    limit : {
        type: Number,
        min: 1, 
        default: 2
    },
    queue: [{
        fileTrackerkey : {  // this will have the keys of the files in S3  
            type: String,
            required: true
        },
        fileTrakerID : {  // this will point to the ID of the file in mongodb 
            type: String,
            required: true
        }
    }]
})

// this is one should be accessed by only the admin 
JobtrackerSchema.statics.getDocument = async function() {
        const jobTracker = await Jobtracker.find({})
        if (jobTracker.length<1 ) {
            jobTracker = [{
              current : 0 , 
              queue : []
            }]; 
        }
    await jobTracker[0].save()
    return jobTracker[0]
}
JobtrackerSchema.statics.addFile =  async function(key , id) {
        //recieving the file 
        let jobTracker = await Jobtracker.find({});
        if ( jobTracker.length<1 ){
            jobTracker = [{ 
              queue : [{fileTrackerkey : key, fileTrakerID :id}]
            }]; 
            jobTracker = await Jobtracker.create(jobTracker[0]);
        }else{
            (jobTracker[0].queue).push({fileTrackerkey : key, fileTrakerID :id}); 
            jobTracker = Jobtracker.updateOne({ _id: jobTracker[0]._id }, jobTracker[0]);  
        }
           
    return jobTracker;
    
}
// this should get the Next file key  to operate on ; increment the current number of files under the limit condition of course ; 
// if current is already equal to limit; it returns an empty id; 
JobtrackerSchema.statics.getNext = async function() {
        let jobTracker = await Jobtracker.find({})
        let nextfile;
        if (jobTracker.length == 1 ){
            // here we check for the current === limit condition ; are allowed to add a file to be processed 
            if(jobTracker[0].current < jobTracker[0].limit && jobTracker[0].queue.length> 0   ){
                   nextfile = jobTracker[0].queue[0]; 

                   jobTracker[0].current ++; 
                   jobTracker[0].queue = jobTracker[0].queue.filter((fileinfo) => {
                       return fileinfo.id != nextfile.id
                   });
                  await jobTracker[0].save()
           }
        }
    return nextfile; 
}

// this should be triggered after the file cracking process 
// no need to know which key it had; if it is processed it means we already removed it from the queue 
JobtrackerSchema.statics.decreaseCount = async function() {
        const jobTracker = await Jobtracker.find({})
        if (jobTracker.length == 1 ){
            console.log("decreaseCount : " + jobTracker[0].current); 
            if(jobTracker[0].current !== 0 ) jobTracker[0].current --; // normally this value jobTracker[0].current should be greater than 1; I'll remove you soon   
            console.log("decreaseCount : " +jobTracker[0].current); 
            await jobTracker[0].save(); 
            return true; 
        } 
    return false;
}
// this is one should be accessed by only the admin 
JobtrackerSchema.statics.updateLimit = async function(newlimit) {
        const jobTracker = await Jobtracker.find({})
        if (jobTracker.length<1 ) {
            jobTracker = [{
              current : 0 , 
              queue : [],
              limit : newlimit
            }]; 
        }else{
            jobTracker[0].limit = newlimit; // current < newlimit ? 
        }
    await jobTracker[0].save()
    return jobTracker[0]; 
}



const Jobtracker = mongoose.model('Jobtracker', JobtrackerSchema)

module.exports = Jobtracker