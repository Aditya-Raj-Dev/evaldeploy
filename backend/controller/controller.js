const express=require("express")
const { UserModel } = require("../model/Todo.model");
const {TodoModel}=require("../model/Todo.model")
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


const GetAllTodo=async(req,res)=>{
    try{
        const{ user_id}=req.body;
        console.log(user_id)
       const data= await TodoModel.find({user_id})
        res.send(data)
    }
    catch(e){
        console.log(e)
        res.send({"msg":"jsdajk"})
    }
  
}

const PostTodo=async(req,res)=>{
    const {user_id,taskname,status,tag}=req.body;
    if(taskname){
        const new_todo=TodoModel({
            user_id,
            taskname,
            status,
            tag
        }) 
         await  new_todo.save()
         res.send({"msg":"added"})
    }
    else{
        res.send({"msg":"fill details"}) 
    }
  
}

const PendingTodo=async(req,res)=>{
    const {user_id}=req.body;
      const user= TodoModel.find(user_id)
     await  new_todo.save()
     res.send({"msg":"added"})
}


module.exports={GetAllTodo,PostTodo}