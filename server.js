const express = require('express');
const morgan = require('morgan');
// states that we are using express & morgan in this file
const hostname = 'localhost';
const port = 3000;

const app = express();
// Returns the express server application that will be available to us under the variable name app
app.use(morgan('dev'));
// Lets morgan log and print additional information to the screen
app.use(express.static(__dirname + '/public'));
// Directs express to serve static files from the public folder
app.use((req, res) => { // Middleware Function
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
}); // Creates the server and starts listening for it