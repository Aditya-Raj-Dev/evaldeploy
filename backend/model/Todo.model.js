const mongoose=require("mongoose")

const TodoSchema=mongoose.Schema({
    user_id:{type:String,required:true},
   taskname:{type:String,required:true},
   status:{type:Boolean,required:true},
    tag:{type:String,required:true}

})

const TodoModel=mongoose.model("todo",TodoSchema)

module.exports={TodoModel}