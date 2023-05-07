const express = require('express')
const { register, login, logout,updateprofile, getProfile } = require('../controller/userControllers')
const {protect} = require('../midldle/handlerFile')
const router = express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/logout",protect,logout)
router.put("/update_profile/:id",protect,updateprofile)
router.get("/get_all_profile",protect,getProfile)
module.exports =router