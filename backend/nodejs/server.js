//express server creation
const express = require('express');
const app = express();

const stringSimilarity = require('string-similarity');
//mongodb connection
const mongoose = require('mongoose');
const mongooseUrl = "mongodb://localhost:27017/scorecarddb";

//parsing i dont know
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//cors used for allowing browers to have request from perticular ip
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: false, // Allow cookies if needed
  }));

async function connectdb(){
    await mongoose.connect(mongooseUrl);
    console.log("mongoose connected");
}
connectdb();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique email
    password: { type: String, required: true },
}) 
const user = new mongoose.model("user", userSchema);

const userJobDataSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    job: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
})
const userdata = new mongoose.model("userjobdata", userJobDataSchema);


const JobSchema = new mongoose.Schema({
    job: { type: String, required: true },
    skill: { type: String},
    topics: { type: String},
});

const jobdata = new mongoose.model("jobdataset", JobSchema);


const topicSchema = new mongoose.Schema({
    userid: {type:String, required:true},
    Skill: { type: String, required: true},
    Topics: { type: String, required: true },
})
const topicdata = new mongoose.model("topicdata", topicSchema);


app.get("/", async(req, res) => {
    try{
        const {userid} = req.query;
        const findtopicforSidbar = await topicdata.find({userid: userid});
        const userinfo = await user.findOne({_id:userid})
        res.status(201).json({findtopicforSidbar:findtopicforSidbar, name:userinfo.name});
    }catch(error){
        res.status(500).json({findtopicforSidbar:findtopicforSidbar, name:userinfo.name});
    }
    
})

app.post("/signup", async(req, res) =>{
    try{
        const {name, email, password} = req.body;
        const newuser = new user({name, email, password});
        await newuser.save();
        res.status(201).json("user created")
    }catch(error){
        res.status(500).json("error in creating user")
    }
})

app.post("/login", async(req, res) => {

    try{
        const {email, password} = req.body;
        const finduser = await user.findOne({email:email})
        if(finduser.password == password){
            res.status(201).json({ message: "User found", userId: finduser.id });

        }
        else{
            res.status(401).json("user not found")
        }
    }catch(error){
        res.status(404).json("user not found");
    }
})

app.post("/roadmapgenerator", async(req, res) =>{
    
    try{
        const {userid, job, duration, level} = req.body;
        const finduser = await userdata.findOne({userid: userid});
        if(finduser){
            await topicdata.deleteMany({userid:userid});
            const data = await userdata.updateOne(
                {userid},
                {$set: {job:job, duration:duration, level:level}},
            )
        }
        else{
            const userjobdata = new userdata({userid, job, duration, level})
            await userjobdata.save();
        }
        res.status(201).json("create roadmap")
    }catch(error){
        res.status(500).json("server error")
    }
})

app.post("/gen", async(req, res) => {

    try{
        const  userid  = req.body.userid;
        const userdata1 = await userdata.findOne({ userid: userid });
        const job = userdata1.job;
        const duration = userdata1.duration*30;
        const level = userdata1.level;

        const skillSet = new Set(); // Store unique skills

    
        /*to-do : convert job input by user using nlp, extract all job from database matches input job*/
        const userdata2 = await jobdata.find({ job: job });
        userdata2.forEach((data) => {
            skillSet.add(data.skill);
        });

        skillSet.delete(""); // Remove any empty strings from the skill set

        const skillArray = Array.from(skillSet);

//ai to find uniue skill     
function deduplicateSkills(skills) {
    const uniqueSkills = [];
    skills.forEach(skill => {
      const match = uniqueSkills.find(existingSkill => 
        stringSimilarity.compareTwoStrings(skill, existingSkill) > 0.5
      );
      if (!match) {
        uniqueSkills.push(skill);
      }
    });
    return uniqueSkills;
  }
  
  const uniqueSkills = deduplicateSkills(skillArray);
  
  
        
        /*to-do : extract all skill from data set now i need to create ai to filter
        out meaningfull and remove similar skill by meaning*/

        /*to-do : need to assign duration to each skill
            rule for duration:
                all skill duration sum should be equal to total duration input by user
                duration assign to skill will be on the basis of there importance
                there should be the rule for assigning duration as per the importance
        */
        const skillDuration =duration;
        const topicSet = new Set();
     
        /*to-do : match skill with database using nlp and extract data */
        async function processUniqueSkills(uniqueSkills, userid) {
            const topicSet = new Set();
        
            for (const skill of uniqueSkills) {
                //console.log(skill);
                // Find userdata for the current skill
                const userdata3 = await jobdata.find({ skill: skill, job:job });
        
                userdata3.forEach((user) => {
                    if (user.topics) {
                        topicSet.add(user.topics); // Add topics to the set
                    }
                });

                if(topicSet.size != 0){
                    const mergedString = Array.from(topicSet).join(", ");
                    const mergedSet = new Set([mergedString]);
                    const topicArray = Array.from(mergedSet);
                    topicSet.clear();
                    mergedSet.clear();
        
                    // Save topics to the database
                    const saveOperations = topicArray.map(async (topic) => {
                        const topicData = new topicdata({
                            userid: userid,
                            Skill: skill, // Assuming skill belongs to this context
                            Topics: topic,
                        });
                        return topicData.save(); // Return the save promise
                    });

                    topicArray.length = 0;
                    // Wait for all saves to complete
                    await Promise.all(saveOperations);
        
                    //console.log(`Completed processing for skill: ${skill}`);
                }
            }
        }
        processUniqueSkills(uniqueSkills, userid);
        
        res.status(201).json("create sidebar topics");
    }catch(error){
        res.status(500).json("error");
    }
        
        
        

});




app.listen(3000, ()=>{
    console.log('server started');
    console.log('http://localhost:3000');
    
})