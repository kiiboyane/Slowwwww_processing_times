const mongoose  = require("mongoose");



// connecting to mongodb :)
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/SmartFlows", { useNewUrlParser: true }) ; 
mongoose.Promise = global.Promise; 