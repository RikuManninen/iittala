const db = require("../../models");
const Marker = db.Marker
const Op = db.Sequelize.Op;

// Create and Save a new Marker
exports.create = (req, res) => {
    // Validate request

    // Create a marker
    const marker = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        content: req.body.content
    };

    // Save marker in the database
    Marker.create(marker)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the marker."
            });
        });
};

// Retrieve all Markers from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? {
        id: {
            [Op.like]: `%${id}%`
        }
    } : null;

    Marker.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving markers."
            });
        });
};

// Find a single Marker with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Marker.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving marker with id=" + id
            });
        });
};

// Update a Marker by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Marker.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Marker was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update marker with id=${id}. Maybe marker was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating marker with id=" + id
            });
        });
};

// Delete a Marker with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Marker.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Marker was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete marker with id=${id}. Maybe marker was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete marker with id=" + id
            });
        });
};

// Delete all Markers from the database.
//exports.deleteAll = (req, res) => {
// 
//};

// Find all published Markers
//exports.findAllPublished = (req, res) => {
//
//};