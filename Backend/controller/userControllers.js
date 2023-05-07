const jwt = require("jsonwebtoken")
const db = require('../Model')
const User = db._users
const Profile = db.profiles
const Role=db.roles
Role.hasOne(User)
User.belongsTo(Role,{constraints: false})
Profile.belongsTo(User)
const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")
const register = asyncHandler (async(req,res)=>{
    const email = req.body.email
    const name=req.body.name
    const gensalt = await bcrypt.genSalt(10)
    const password = req.body.password
    const hashpwd = await bcrypt.hash(String(password),gensalt)
    const roleId = req.body.roleId
    const my_user = await User.findOne({
        where:{
            email:email,
            name:name,
        
    },include:[Role]})
      
    if (my_user!=null){
        res.send({message:"User already exist"})

    }
    else{
        const new_user={
            email:email,
            password:hashpwd,
            name:name,
            roleId:roleId
        }
        const h_user =await User.create(new_user);
        const new_profile={
            email:email,
           name:name,
        UserId:h_user.id
        }
        await Profile.create(new_profile).then(data=>{
         res.status(200).json({message:`New user createed`})
        }).catch(err=>{
           res.status(500).send({message:err})
        })
    }
})
const login = asyncHandler (async(req,res)=>{
    const email = req.body.email
    const pwd   = req.body.password
    const my_user = await User.findOne({
        where:{
            email:email
        }
    })
    if (my_user==null){
        res.send({message:"User is not exist!"})
    }
    else if ((my_user!=null)&&(my_user.email==email)&&(bcrypt.compare(pwd,my_user.password))){
        await my_user.update({logged_in:true},{ where:{
            email:email}
        })
        const my_token = await generatetoken(my_user.id)
        res.send({message:"Successful Logged !",token:my_token,status:my_user.logged_in})
    }
})
const logout = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({
        where:{
            id:req.user_id
        }
    })
    if (my_user==null){
        res.send({message:"User is not exist!"})
    }
    else if (my_user!=null){
        await my_user.update({logged_in:false},{ where:{
            id:req.user_id}
        })
        res.send({message:"Successful Logged out !",status:my_user.logged_in})
    }

    });

const getProfile = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const my_profile = await Profile.findOne({include:[User],where:{UserId:req.user_id}})
    if (my_profile!=null){
        res.status(200).json({profile:my_profile,role:my_user["role"]["role_name"]})
    }
})

const updateprofile = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const my_profile = await Profile.findOne({where:{id:id}})
    const user_id =req.user_id
    const phoneNumber = req.body.phoneNumber
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    if (my_profile==null){
        res.status(200).send({'message':"Profile is not found!"})
    }else if (user_id!=my_profile.UserId){
        res.status(200).send({'message':"Not Authorized!"})
    }
    else if (my_profile!=null && user_id==my_profile.UserId){
        await Profile.update(
            {name:name,
             email:email,
             address:address,
             phoneNumber:phoneNumber
         },{where:{
            id:id
         }}
        ).then(data=>{
            res.status(200).json({'message':"Profile update successfully"})
        }).catch(err=>{
            res.status(200).json({'message':err.mesaage||"some error occured while adding"})
        })
    }
})
const generatetoken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRETKEY,{
        expiresIn:'1h'
    })
}
const generateexpiretoken =(id)=>{
    return jwt.sign({id}," ",{
        expiresIn:'0h'
    })
}

module.exports={
    register,login,logout,updateprofile,getProfile
}