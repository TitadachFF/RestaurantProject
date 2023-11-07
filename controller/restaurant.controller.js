const Restaurant = require("../models/restaurant.model")

Restaurant.getAll = async () => {
    try {
        const restaurants = await Restaurant.findAll();
        return restaurants.map(restaurant => restaurant.toJSON());
    } catch (error) {
        console.error("error",error);
        throw error;
    }
}


module.exports = Restaurant;