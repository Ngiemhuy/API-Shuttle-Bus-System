module.exports=(sequelize,DataTypes)=>{
    const Zone = sequelize.define("zones",{
         zone_name:{type:DataTypes.STRING,allowNull:false,unique:true},
    });
    return Zone;
}