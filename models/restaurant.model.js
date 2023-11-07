const {DataTypes} = require("sequelize");
const sequelize = require("./db");

const Restaurant = ("restaurant",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue : DataTypes.NOW

    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull: true,
        defaultValue :DataTypes.NOW
    },
});


Restaurant.findAll = async () => {
    const restaurants = await Restaurant.findAll();
    console.log(restaurants.every(restaurant => restaurant instanceof Restaurant)); // true
    console.log("All users:", JSON.stringify(restaurants));
}


module.exports = Restaurant;