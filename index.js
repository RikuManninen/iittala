const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");

const AdminBro = require('admin-bro')
const AdminBroSequelize = require('@admin-bro/sequelize')
const AdminBroExpress = require('@admin-bro/express')

const app = express()

const port = process.env.PORT || 5000
const path = require('path')

var corsOptions = {
    origin: "http://localhost:5001"
};

const db = require("./models");
db.sequelize.sync();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to iittala app api." });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

require("./api/routes/marker.routes")(app);

// Register adapter
AdminBro.registerAdapter(AdminBroSequelize)

// AdminBro
const adminBro = require('./admin')

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
app.listen(port, () => console.log('Server is under localhost:'+ port))