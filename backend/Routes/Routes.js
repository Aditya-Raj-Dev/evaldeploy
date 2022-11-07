const { Router } = require("express");
const { GetAllTodo, PostTodo } = require("../controller/controller");
const {authentication}=require("../Auth/authentication")
const UserRouter = Router();

UserRouter.get("/",authentication, GetAllTodo)
UserRouter.post("/create",authentication,PostTodo)



module.exports = { UserRouter };