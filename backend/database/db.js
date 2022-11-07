const mongoose =require("mongoose")

const connection =mongoose.connect("mongodb+srv://mern:123@cluster0.tythjmm.mongodb.net/?retryWrites=true&w=majority")

module.exports={connection}