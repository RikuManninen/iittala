const express = require('express')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const path = require('path')

const app = express()

const portApi = process.env.PORT || 5000
const portAdmin = process.env.PORT || 8080

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
    const hello = "Hello from Express!"
    res.send(hello)
    console.log("Sent message: " + hello)
})

app.listen(portApi, () => console.log('Api is under localhost:'+ portApi +'/api'))

// AdminBro
const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
app.listen(portAdmin, () => console.log('AdminBro is under localhost:'+ portAdmin +'/admin'))