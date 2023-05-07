const jwt = require("jsonwebtoken")
const { Op } = require("sequelize");
const Sequelize = require("sequelize")
const db = require('../Model')
const User = db._users
const Role = db.roles
const Zone = db.zones
const Station = db.stations
const BookingInfo=db.booking_infos
const Schedule = db.schedules
Station.hasMany(Schedule,{foreignKey:{name:'pick_up_location_id',allowNull:false,}})
Station.hasMany(Schedule,{foreignKey:{name:'destination_location_id',allowNull:false}})
Schedule.belongsTo(Station, { as: 'pick_up_location', foreignKey: 'pick_up_location_id' });
Schedule.belongsTo(Station, { as: 'destination_location', foreignKey: 'destination_location_id' });
const asyncHandler=require("express-async-handler")
const create_schedule = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const pick_up_date = req.body.pick_up_date
    const pick_up_time = req.body.pick_up_time
    const pick_up_location_id = req.body. pick_up_location_id
    const arrival_date = req.body.arrival_date
    const arrival_time = req.body.arrival_time
    const destination_location_id = req.body.destination_location_id
    if ((my_user["role"]["role_name"]=='Admin')){
        const new_schedule={
            pick_up_date:pick_up_date,
            pick_up_time:pick_up_time,
            pick_up_location_id:pick_up_location_id,
            arrival_date:arrival_date,
            arrival_time:arrival_time,
            destination_location_id:destination_location_id,
        }
        await Schedule.create(new_schedule).then(data=>{
            res.status(200).json({message:`New Schedule createed`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const delete_schedule = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const schedule_id = req.params.id
    const my_schedule=await Schedule.findOne({where:{id:schedule_id}})
    if ((my_user["role"]["role_name"]=='Admin')&&(my_schedule!=null)){
        await Schedule.destroy({where:{id:schedule_id}}).then(data=>{
            res.status(200).json({message:` Schedule deleted`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const update_schedule = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const pick_up_date = req.body.pick_up_date
    const pick_up_time = req.body.pick_up_time
    const pick_up_location_id = req.body. pick_up_location_id
    const arrival_date = req.body.arrival_date
    const arrival_time = req.body.arrival_time
    const destination_location_id = req.body.destination_location_id
    const schedule_id = req.params.id
    const my_schedule=await Schedule.findOne({where:{id:schedule_id}})
    if ((my_user["role"]["role_name"]=='Admin')&&(my_schedule!=null)&&(pick_up_date!=null)&&(pick_up_time!=null)&&(arrival_date!=null)&&(arrival_time!=null)&&(pick_up_location_id!=null)&&(destination_location_id!=null)){
            const new_schedule={
            pick_up_date:pick_up_date,
            pick_up_time:pick_up_time,
            pick_up_location_id:pick_up_location_id,
            arrival_date:arrival_date,
            arrival_time:arrival_time,
            destination_location_id:destination_location_id
        }
        await Schedule.update(new_schedule,{where:{id:schedule_id}}).then(data=>{
            res.status(200).json({message:`New Schedule createed`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else if ((my_user["role"]["role_name"]=='Driver')&&(my_schedule!=null)&&(pick_up_time!=null)&&(arrival_time!=null)){
        const new_schedule={
        pick_up_time:pick_up_time,
        arrival_time:arrival_time,
    }
    await Schedule.update(new_schedule,{where:{id:schedule_id}}).then(data=>{
        res.status(200).json({message:`New Schedule createed`})
       }).catch(err=>{
          res.status(500).send({message:err})
       })
}else{
        res.status(404).json({'message':'error'})
    }
})
const get_available_schedule = asyncHandler(async(req,res)=>{
    const today=new Date()
    const today_fromat= today.toLocaleDateString().replace("/","-")
    const my_schedule=await Schedule.findAll({
      include: [{
        model: Station,
        as: 'pick_up_location'
      },
      {
        model: Station,
        as: 'destination_location'
      }],where:{pick_up_date:{[Op.gt]:today_fromat}}})
    if (my_schedule!=null){
    //    const schedule_data={
    //         pick_up_date:my_schedule.pick_up_date,
    //         pick_up_time:my_schedule.pick_up_time,
    //         pick_up_location_id:my_schedule["station"]["station_name"],
    //         arrival_date:my_schedule.arrival_date,
    //         arrival_time:my_schedule.arrival_time,
    //         destination_location_id:my_schedule["station"]["station_name"]
    //     }
        res.status(404).json({'message':my_schedule})
    }
    else{
        res.status(404).json({'Message':'Error'})
    }
})
module.exports={
  create_schedule,delete_schedule,get_available_schedule,update_schedule
}