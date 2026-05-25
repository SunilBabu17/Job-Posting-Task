const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    companyName:{
        type:String
    },
    salaryRange:{
        type:String
    },
    location:{
        type:String
    },
    experience:{
        type:String
    },
    skills:{
        type:String
    },
    deadline:{
        type:Date
    },
    jobStatus:{
        type:String
    }
})

const Job = mongoose.model("Job",jobSchema);

module.exports = Job