module.exports=(sequelize,DataTypes)=>{
    const Role = sequelize.define("roles",{
          role_name:{type:DataTypes.STRING,allowNull:false,unique:true}
    });
    return Role;
}