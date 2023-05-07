const express = require('express')
const {create_zone, delete_zone, update_zone, get_all_zone, create_station, delete_station, update_station, get_all_station, get_station_base_on_zone } = require('../controller/locationControllers')
const {protect} = require('../midldle/handlerFile')
const router = express.Router()
router.post("/create_zone",protect,create_zone)
router.delete("/delete_zone",protect,delete_zone)
router.put("/update_zone",protect,update_zone)
router.get("/get_all_zone",protect,get_all_zone)
router.post("/create_station",protect,create_station)
router.delete("/delete_station",protect,delete_station)
router.put("/update_station",protect,update_station)
router.get("/get_all_station",protect,get_all_station)
router.get("/get_all_station_based_on_zone",protect,get_station_base_on_zone)
module.exports=router