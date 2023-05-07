const express = require('express')
const dotenv = require('dotenv').config()
const {protect} = require('./midldle/handlerFile')
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode:500
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV=='production'? null:err.stack
    })
}
const port = process.env.port
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json())
app.use(require("./routes/baseRoute"))
app.use("/location",require("./routes/locationRoute"))
app.use("/booking",require("./routes/bookingRoute"))
app.use("/schedule",require("./routes/scheduleRoute"))
const db = require("./Model")
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.use(errorHandler)
app.use(protect)
app.listen(port,()=>console.log(`Server started on port ${port}`))