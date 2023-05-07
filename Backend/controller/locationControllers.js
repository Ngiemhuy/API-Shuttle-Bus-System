const jwt = require("jsonwebtoken")
const db = require('../Model')
const User = db._users
const Role = db.roles
const Zone = db.zones
const Station = db.stations
Zone.hasMany(Station)
Station.belongsTo(Zone)
const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")
const create_zone = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const zone_name = req.body.zonename
    const my_zone=await Zone.findOne({where:{zone_name:zone_name}})
    if ((my_user["role"]["role_name"]=='Admin')&&(zone_name!=null)&&(my_zone==null)){
        const new_zone={zone_name:zone_name}
        const my_zone=await Zone.create(new_zone).then(data=>{
            res.status(200).json({message:`New zone createed`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const delete_zone = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const zone_id = req.body.zoneid
    const my_zone=await Zone.findOne({where:{id:zone_id}})
    if ((my_user["role"]["role_name"]=='Admin')&&(my_zone!=null)){
        await Zone.destroy({where:{id:zone_id}}).then(data=>{
            res.status(200).json({message:` zone deleted`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const update_zone = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const zone_id = req.body.zoneid
    const new_zone_name=req.body.newZoneName
    const my_zone=await Zone.findOne({where:{id:zone_id}})
    if ((my_user["role"]["role_name"]=='Admin')&&(my_zone!=null)){
        await Zone.update({zone_name:new_zone_name},{where:{id:zone_id}}).then(data=>{
            res.status(200).json({message:` zone updated`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const get_all_zone = asyncHandler(async(req,res)=>{
    const my_zone=await Zone.findAll()
    res.status(404).json({'All Available Zone':my_zone})
    
})
const create_station = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const station_name = req.body.station_name
    const zone_id = req.body.zone_id
    const my_station=await Station.findOne({where:{station_name:station_name}})
    if ((my_user["role"]["role_name"]=='Admin')&&(station_name!=null)&&(my_station==null)){
        const new_station={station_name:station_name,zoneId:zone_id}
        await Station.create(new_station).then(data=>{
            res.status(200).json({message:`New station createed`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const delete_station = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const station_id = req.body.station_id
    const my_station=await Station.findOne({where:{id:station_id}})
    if ((my_user["role"]["role_name"]=='Admin')&&(my_station!=null)){
        await Station.destroy({where:{id:station_id}}).then(data=>{
            res.status(200).json({message:` Station deleted`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const update_station = asyncHandler(async(req,res)=>{
    const my_user = await User.findOne({include:[Role],where:{id:req.user_id}})
    const station_id = req.body.stationid
    const new_station_name=req.body.newStationName
    const my_station=await Station.findOne({where:{id:station_id}})
    if ((my_user["role"]["role_name"]=='Admin')&&(my_station!=null)){
        await Station.update({station_name:new_station_name},{where:{id:station_id}}).then(data=>{
            res.status(200).json({message:` zone updated`})
           }).catch(err=>{
              res.status(500).send({message:err})
           })
    }else{
        res.status(404).json({'message':'error'})
    }
})
const get_all_station = asyncHandler(async(req,res)=>{
    const my_zone=await Station.findAll()
    res.status(404).json({'All Available Zone':my_zone}) 
})
const get_station_base_on_zone=asyncHandler(async(req,res)=>{
    const zone_id=req.body.zone_id
    const my_station = await Station.findAll({where:{zoneId:zone_id}})
    if (my_station!=null){
        res.status(404).json({'message':my_station})
    }
    else{
        res.status(404).json({'Message':'Error'})
    }
})
module.exports={
    create_zone,delete_zone,update_zone,get_all_zone,get_all_station,get_station_base_on_zone,update_station,delete_station,create_station
}
