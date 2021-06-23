module.exports = app => {
    const markers = require("../controllers/marker.controllers");
  
    var router = require("express").Router();
  
    // Create a new marker
    router.post("/", markers.create);
  
    // Retrieve all markers
    router.get("/", markers.findAll);
  
    // Retrieve all published markers
    //router.get("/published", markers.findAllPublished);
  
    // Retrieve a single marker with id
    router.get("/:id", markers.findOne);
  
    // Update a marker with id
    router.put("/:id", markers.update);
  
    // Delete a marker with id
    router.delete("/:id", markers.delete);
  
    // Delete all markers
    //router.delete("/", markers.deleteAll);
  
    app.use('/api/markers', router);
};