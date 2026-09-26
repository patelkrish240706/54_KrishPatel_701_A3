const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// Add Student
router.post("/add", async (req,res)=>{

  try{

    const student = await Student.create(req.body);

    res.json({
      message:"Student added successfully",
      student:student
    });

  }catch(error){

    res.status(500).json({
      message:"Error adding student"
    });

  }

});


// Get All Students
router.get("/list", async (req,res)=>{

  try{

    const students = await Student.findAll();

    res.json(students);

  }catch(error){

    res.status(500).json({
      message:"Error getting students"
    });

  }

});


// Get Student By ID
router.get("/:id", async (req,res)=>{

  try{

    const student = await Student.findByPk(req.params.id);

    res.json(student);

  }catch(error){

    res.status(500).json({
      message:"Error getting student"
    });

  }

});


// Update Student
router.put("/update/:id", async (req,res)=>{

  try{

    await Student.update(
      req.body,
      {
        where:{
          id:req.params.id
        }
      }
    );

    res.json({
      message:"Student updated successfully"
    });

  }catch(error){

    res.status(500).json({
      message:"Error updating student"
    });

  }

});


// Delete Student
router.delete("/delete/:id", async (req,res)=>{

  try{

    await Student.destroy({
      where:{
        id:req.params.id
      }
    });

    res.json({
      message:"Student deleted successfully"
    });

  }catch(error){

    res.status(500).json({
      message:"Error deleting student"
    });

  }

});


module.exports = router;