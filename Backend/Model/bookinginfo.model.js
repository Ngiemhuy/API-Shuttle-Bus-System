module.exports=(sequelize,DataTypes)=>{
    const BookingInfo = sequelize.define("bookinginfos",{
         is_cancelled:{type:DataTypes.BOOLEAN,defaultValue:false},
         is_arrived:{type:DataTypes.BOOLEAN,defaultValue:false},
    });
    return BookingInfo;
}