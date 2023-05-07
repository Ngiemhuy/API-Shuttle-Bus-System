const jwt = require("jsonwebtoken")
const db = require('../Model')
const asyncHandler=require("express-async-handler")
const User = db._users
const protect = asyncHandler(async(req,res,next)=>{
  let token 
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        //Get token from header
        token = req.headers.authorization.split(" ")[1]
        const decoded =await jwt.verify(token,process.env.JWT_SECRETKEY)
        req.user_id=decoded.id
        const my_user = await User.findOne({where:{
               id:decoded.id
        }})
        if (my_user==null || my_user.logged_in==false){
            res.status(401)
            throw new Error("Not Authorized")
        } else if (my_user!=null && my_user.logged_in==true){
            next()
        }
    }catch (error){
        res.status(401) 
        throw new Error("Not Authorized")
    }
  }
  if (!token){
    res.status(401)
    throw new Error("Not Authorized")
  }
})
module.exports={protect,asyncHandler}