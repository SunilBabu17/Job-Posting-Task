const Job = require('../models/JobListing');

const addJob = async (req,res) => {
    const { jobTitle,jobDescription,jobType,companyName,salaryRange,location,experience,skills,deadline,jobStatus } = req.body;
    try{
        const newJob = new Job({
            jobTitle,jobDescription,jobType,companyName,salaryRange,location,experience,skills,deadline,jobStatus
        })
        await newJob.save();
        return res.status(201).json({
            success:true ,
            message:"Job posted Successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        });
    }
}

const getAllJobs = async (req,res) => {
    try{
        const data = await Job.find();
        return res.status(200).json({
            success:true,
            data:data
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        });
    }
}