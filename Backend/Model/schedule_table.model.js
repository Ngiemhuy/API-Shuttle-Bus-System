module.exports=(sequelize,DataTypes)=>{
    const Schedule= sequelize.define("schedules",{
         pick_up_date:{type:DataTypes.DATEONLY,allowNull:false,unique:false},
         pick_up_time:{type:DataTypes.TIME,allowNull:false,unique:false},
         arrival_date:{type:DataTypes.DATEONLY,allowNull:false,unique:false},
         arrival_time:{type:DataTypes.TIME,allowNull:false,unique:false}

    });
    return Schedule;
}