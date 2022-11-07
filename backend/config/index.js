const express=require("express")
const {connection}=require("../database/db")
const bcrypt = require('bcrypt');
const {UserModel}=require("../model/User.model")
var jwt = require('jsonwebtoken');
const { authentication } = require("../Auth/authentication");
const {UserRouter}=require("../Routes/Routes")
const app=express()
require("dotenv").config()
const cors=require("cors")


app.use(cors())
app.use(express.json())
app.use("/todos",UserRouter)

app.get("/",(req,res)=>{
    res.send("home")
})

app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(user){
        res.send({"msg":"User already exhist"})
    }
    else{
        bcrypt.hash(password, 5, async function(err, hash) {
          if(err){
            res.send({"msg":"wrong"})
          }
          try{
             const newUser=UserModel({
                name,
                email,
                password:hash
             })
             await newUser.save()
             res.send({"msg":"Signup sucess"})
          }
          catch(e){
            res.send({"msg":"Signup Failed"})
          }
        });
        
    }
   
})



app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user= await UserModel.findOne({email})
    if(user){
        const hash_pass=user.password
        const user_id=user._id
        bcrypt.compare(password, hash_pass, function(err, result) {
            if(err){
                res.send({"msg":"wrong"})
            }
            if(result){
                var token = jwt.sign({user_id }, process.env.SECRET_KEY);
                res.send({"msg":"login success","token":token})
            }
            else{
                 res.send({"msg":"Login failed"})
            }
        });
    }
    else{
        res.send({"msg":"Login first"})
    }
   
})

app.post("/create",authentication,(req,res)=>{
    res.send("j")
})

app.listen(8080,async(req,res)=>{
    try{
        await connection
        console.log("database conneected")
    }
    catch(err){
        console.log("err")
    }
    console.log("server startted")
})