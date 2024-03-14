const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;


// Schema
const schemaData = mongoose.Schema({
    name: String,
    age: Number,
    physics: Number,
    chemistry: Number,
    marks: Number
  }, {
    timestamps: true
  });

  const userModel = mongoose.model("user", schemaData);

app.get("/",async(req,res)=>{
    const data = await userModel.find({});
    res.json({ success: true, data: data });
})

// Read
app.get("/", async (req, res) => {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
  });

 // Create data || save data in MongoDB
app.post("/create", async (req, res) => {
    const { name, age, physics, chemistry, marks } = req.body;
    const data = new userModel({ name, age, physics, chemistry, marks });
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
  }); 

  //update data 
  app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { _id,...rest} = req.body 

    console.log(rest)
    const data = await userModel.updateOne({ _id : _id},rest)
    res.send({success : true, message : "data update successfully", data : data})
})

//delete api
// http://localhost:8080/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "data delete successfully", data : data})
})


mongoose.connect("mongodb://localhost:27017/cruoperation")
.then(()=>{
    console.log("connect to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))
