const express = require("express")
const routes = express.Router();
const Restaurant = require("../models/restaurant.model");

//INSERT restaurant to database
routes.post("/insert",(req, res)=>{
    const newRestaurant = new Restaurant({
  name:req.body.name,
  type:req.body.type,
  price:req.body.price,
  imageurl:req.body.imageurl,
  title:req.body.title
})
//http://localhost:5000/restaurants
Restaurant.create(newRestaurant , (err , data)=>{
    if (err) {
        res.status(500).send({
            message : err.message || "Some error accured while inserting the new restaurant"
        })

    }else(
        res.send(data)
    )
})
})
//get
routes.get("/get", (req,res)=>{
    Restaurant.getAll((err, data)=>{
        if (err) {
            res.status(500).send({
                message:
                err.message||
                "some err"
            });
        }else{
            res.send(data);
        }
    })
})

//getbyid
routes.get("/getbyid/:id", (req, res) => {
    const restaurantId = req.params.id;

    Restaurant.getById(restaurantId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the restaurant"
            });
        } else if (!data) {
            res.status(404).send({
                message: "Restaurant not found [ID]"
            });
        } else {
            res.send(data);
        }
    });
});

    


// Update
routes.put("/update/:id", (req, res) => {
    const restaurantId = req.params.id;
    const updatedData = req.body; // Assuming the updated data is provided in the request body

    Restaurant.updateById(restaurantId, updatedData, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the restaurant"
            });
        } else {
            res.send(data);
        }
    });
});

// Delete
routes.delete("/delete/:id", (req, res) => {
    const restaurantId = req.params.id;

    Restaurant.deleteById(restaurantId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the restaurant"
            });
        } else {
            res.send(data);
        }
    });
});




module.exports =  routes
