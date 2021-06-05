const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
    const hello = "Hello from Express!";
    res.send(hello);
    console.log("Sent message: " + hello);
})

app.listen(port);

console.log(`Server listening on ${port}`);