var jwt = require('jsonwebtoken');

const authentication =(req,res,next)=>{
      const token=req.headers?.authorization
       if(!token){
            res.send({"msg":"please Login"})
       }
       else{
         jwt.verify(token, '1234', function(err, decoded) {
            if(err){
               res.send({"msg":"Invalid Cred"})
            }
            else{
               req.body.user_id=decoded.user_id
               next()
            }
         
          });
       }
    }


    module.exports={authentication}