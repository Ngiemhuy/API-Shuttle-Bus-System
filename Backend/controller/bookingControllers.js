const { Op } = require("sequelize");
const jwt = require("jsonwebtoken")
const db = require('../Model')
const User = db._users
const Role = db.roles
const Zone = db.zones
const Station = db.stations
const BookingInfo=db.booking_infos
const Schedule = db.schedules
User.hasMany(BookingInfo,{foreignKey:{name:'user_id',allowNull:false}})
User.hasMany(BookingInfo,{foreignKey:{name:'driver_id',allowNull:true}})
Schedule.hasMany(BookingInfo,{foreignKey:{name:'schedule_id',allowNull:false}})
BookingInfo.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
BookingInfo.belongsTo(User, { as: 'driver', foreignKey: 'driver_id' });
BookingInfo.belongsTo(Schedule,{as: 'schedule', foreignKey: 'schedule_id' })
const asyncHandler=require("express-async-handler")
const booking = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const schedule_id = req.body.schedule_id
    const my_schedule=await Schedule.findOne({where:{id:schedule_id}})
    if ((my_user["role"]["role_name"]=='User')&&(my_user!=null)&&(my_schedule!=null)){
        const new_booking={
                  user_id:my_user.id,
                  schedule_id:schedule_id
        }
        const my_booking=await BookingInfo.create(new_booking).then(data=>{
            res.status(200).json({message:`New booking createed`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }
    res.status(200).send("")
   
})
const cancel_booking = asyncHandler(async(req,res)=>{
     const booking_id=req.params.id
     const my_booking = await BookingInfo.findOne({ where: {
        [Op.and]: [
          { id: booking_id },
          { user_id: req.user_id }
        ]}})
     if (my_booking!=null){
        BookingInfo.update({is_cancelled:true},{where: {
            [Op.and]: [
              { id: booking_id },
              { user_id: req.user_id }
            ]}}).then(data=>{
                res.status(200).json({message:`Booking cancelled`})
               }).catch(err=>{
                  res.status(500).send({message:err})
               })
     }else{
        res.status(404).json({'message':'Not Authorised'})
    }
   
})
const arrival_status = asyncHandler(async(req,res)=>{
    const booking_id=req.params.id
    const my_booking = await BookingInfo.findOne({ where: {
       [Op.and]: [
         { id: booking_id },
         { user_id: req.user_id },
         {is_cancelled:false}
       ]}})
    if ((my_booking!=null)){
       BookingInfo.update({is_arrived:true},{where: {
           [Op.and]: [
             { id: booking_id },
             { user_id: req.user_id }
           ]}}).then(data=>{
               res.status(200).json({message:`User arrive`})
              }).catch(err=>{
                 res.status(500).send({message:err})
              })
    }else{
       res.status(404).json({'message':'Not Authorised'})
   }
  
})
const assign_driver = asyncHandler(async(req,res)=>{
    const driver_id=req.body.driver_id
    const booking_id=req.params.id
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const my_driver = await User.findOne({include:[Role],where:{id:driver_id}})
    const my_booking = await BookingInfo.findOne({ where: {
       [Op.and]: [
         { id: booking_id },
         { is_arrived: false },
         {is_cancelled:false}
       ]}})
    if ((my_booking!=null)&&(my_user["role"]["role_name"]=='Admin')&&(my_driver["role"]["role_name"]=='Driver')){
       BookingInfo.update({driver_id:driver_id},{where: {
        [Op.and]: [
            { id: booking_id },
            { is_arrived: false },
            {is_cancelled:false}
           ]}}).then(data=>{
               res.status(200).json({message:`Driver Assign`})
              }).catch(err=>{
                 res.status(500).send({message:err})
              })
    }else{
       res.status(404).json({'message':'Not Authorised'})
   }
  
})
const getALlDriver= asyncHandler(async(req,res)=>{
    const my_admin = await User.findOne({include:[Role],where:{id:req.user_id}})
    const my_driver = await User.findAll({include:{model:Role,where:{role_name:'Driver'}}})
    if ((my_driver!=null)&&(my_admin["role"]["role_name"]=='Admin')){
        res.status(400).json({'message':my_driver}).then(data=>{
            res.status(200).json({message:my_driver})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'Not Authorised'})
    }

})
const get_all_booking =asyncHandler(async(req,res)=>{

    
})

module.exports={
   booking,cancel_booking,arrival_status,assign_driver,getALlDriver
}