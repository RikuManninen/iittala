const express = require('express')
const AdminBro = require('admin-bro')
const AdminBroSequelize = require('@admin-bro/sequelize')
const AdminBroExpress = require('@admin-bro/express')

const app = express()

const portAdmin = process.env.PORT || 8080

// Register adapter
AdminBro.registerAdapter(AdminBroSequelize)

// AdminBro
const adminBro = require('./admin')

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
app.listen(portAdmin, () => console.log('AdminBro is under localhost:'+ portAdmin +'/admin'))