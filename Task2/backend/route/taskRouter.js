const express=require('express');
const { TaskModel } = require('../model/TaskModel');
const taskRouter=express.Router()

taskRouter.get("/",async(req,res)=>{
    try {
        const tasks=await TaskModel.find()
        res.status(200).json(tasks)
    } catch (error) {
        console.log("Error in getTask")
        res.status(500).json({error:error.message})
    }
})
taskRouter.post("/",async(req,res)=>{
    try {
       const {task}=req.body;
       const newTask=new TaskModel({task})
       await newTask.save()
       res.status(201).json({message:"New Task added",task:newTask})
    } catch (error) {
        console.log('Error in addTask')
        res.status(500).json({error:error.message})
    }
})

taskRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        await TaskModel.findByIdAndDelete({_id:id})
        // console.log({message:"Task deleted"})
        res.status(200).json({message:"Task deleted"})
    } catch (error) {
        console.log("Error in delete task")
        res.status(500).json({error:error.message})
    }
})

module.exports={
    taskRouter
}