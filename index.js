const express = require('express')
const mysql = require('mysql')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const path = require('path')

const app = express()

const portApi = process.env.PORT || 5000
const portAdmin = process.env.PORT || 8080

// connect to cleardb mysql database
// mysql://b9c74f2f279a95:5d923458@eu-cdbr-west-01.cleardb.com/heroku_bfe46e9135f8783?reconnect=true
const connection = mysql.createConnection({
  host: 'eu-cdbr-west-01.cleardb.com',
  user: 'b9c74f2f279a95',
  password: '5d923458',
  database: 'heroku_bfe46e9135f8783'
})

connection.connect()

// db test query
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()

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