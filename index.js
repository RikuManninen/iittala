const express = require('express')
const dotenv = require('dotenv').config()
const helmet = require("helmet");
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
const User = db.User

db.sequelize.sync();

app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(cors(corsOptions));

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

// Authenticated Router
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.authenticate(email, password)
      if (user) {
        return user
      }
    return false
  },
  cookiePassword: 'session Key',
})

app.use(adminBro.options.rootPath, router)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log('Server is under localhost:'+ port))

