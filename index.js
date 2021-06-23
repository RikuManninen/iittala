const express = require('express')
const cors = require("cors");

const AdminBro = require('admin-bro')
const AdminBroSequelize = require('@admin-bro/sequelize')
const AdminBroExpress = require('@admin-bro/express')

const app = express()

const portAdmin = process.env.PORT || 8080
const portApi = process.env.PORT || 5000

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

require("./api/routes/marker.routes")(app);

app.listen(portApi, () => console.log('Api is under localhost:'+ portApi +'/'))





// Register adapter
AdminBro.registerAdapter(AdminBroSequelize)

// AdminBro
const adminBro = require('./admin')

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
app.listen(portAdmin, () => console.log('AdminBro is under localhost:'+ portAdmin +'/admin'))