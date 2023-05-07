const dbConfig = require("../config/db")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorsAliases:false,
    pool:{
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
});

const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.profiles = require("./profile.model")(sequelize,Sequelize)
db._users=require("./user.model")(sequelize,Sequelize)
db.roles=require("./role.model")(sequelize,Sequelize)
db.zones=require("./zone.model")(sequelize,Sequelize)
db.stations=require("./stations.model")(sequelize,Sequelize)
db.booking_infos=require("./bookinginfo.model")(sequelize,Sequelize)
db.schedules=require("./schedule_table.model")(sequelize,Sequelize)
module.exports=db,sequelize;