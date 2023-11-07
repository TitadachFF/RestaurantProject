const Restaurant = require("../controller/restaurant.controller");

module.exports = function (app) {
    app.get("/restaurants" ,async(req, res) => {
        try {
            const restaurants = await Restaurant.getAll();
            res.status(200).json(restaurants)
        } catch (error) {
            res.status(500).json({error:"can't get restaurants"})
        }
    } )
};