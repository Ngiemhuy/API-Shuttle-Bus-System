module.exports=(sequelize,DataTypes)=>{
    const User = sequelize.define("_users",{
         email:{type:DataTypes.STRING,allowNull:false,unique:true},
         name:{type:DataTypes.STRING,allowNull:false,unique:true},
         password:{type:DataTypes.STRING,allowNull:false},
         logged_in:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
    });
    return User;
}