module.exports=(sequelize,DataTypes)=>{
    const Station = sequelize.define("stations",{
         station_name:{type:DataTypes.STRING,allowNull:false,unique:true},
    });
    return Station;
}