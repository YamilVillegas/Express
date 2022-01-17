const express = require('express');
// states that we are using express in this file
const hostname = 'localhost';
const port = 3000;

const app = express();
// Returns the express server application that will be available to us under the variable name app
app.use((req, res) => { // Middleware Function
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
}); // Creates the server and starts listening for it