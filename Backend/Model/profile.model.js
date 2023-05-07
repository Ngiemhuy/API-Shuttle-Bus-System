module.exports = (sequelize,DataTypes)=>{
    const Profile = sequelize.define("profiles",{
          name:{type:DataTypes.STRING,allowNull:false,unique:true},
          email:{type:DataTypes.STRING,allowNull:false,unique:true},
          address:{type:DataTypes.STRING,allowNull:true,defaultValue:"N/A"},
          phoneNumber:{type:DataTypes.STRING,allowNull:true,defaultValue:"N/A"},
          license_plate_no:{type:DataTypes.STRING,allowNull:false,defaultValue:"N/A"},
          bus_type:{type:DataTypes.STRING,allowNull:false,defaultValue:"N/A"},
          max_seats:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
          year_experience:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0}

    });
    return Profile;
}