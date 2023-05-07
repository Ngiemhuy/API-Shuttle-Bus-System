const express = require('express')
const {protect} = require('../midldle/handlerFile')
const { create_schedule, delete_schedule, update_schedule, get_available_schedule } = require('../controller/scheduleController')
const router = express.Router()
router.post("/create_schedule",protect,create_schedule)
router.delete("/delete_schedule/:id",protect,delete_schedule)
router.put("/update_schedule/:id",protect,update_schedule)
router.get("/get_available_schedule",protect,get_available_schedule)
module.exports=router