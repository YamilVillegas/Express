const express = require('express');
const morgan = require('morgan');
// states that we are using express & morgan in this file
const hostname = 'localhost';
const port = 3000;

const app = express();
// Returns the express server application that will be available to us under the variable name app
app.use(morgan('dev'));
// Lets morgan log and print additional information to the screen
app.use(express.json());
// Express Middleware function

app.all('/campsites',(req,res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});
// We are sending plain text as a response. The next() function is passing control of the routing to the next relevant routing method after this one. Otherwise it will stop here and not go any further.

app.get('/campsites', (req, res) => {
    res.end('Will send all campsites to you');
});
// This ends the response and sends the plain text string back to the client.

app.post('/campsites', (req,res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});
// If the client uses a POST method it will jump from app.all to app.post, skipping the app.get method since it is not a GET request. The EXPRESS.JSON takes the properties from the JSON data that it receives and sets it up as properties of the req.body javascript object. 

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});
// We are rejecting the request if the client requests a PUT.

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});
// We will be adding authentication priviliges to this later on.

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
}); 
// Echoing back the request to make sure we see the requested campsiteId correctly.

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
}); // We are not supporting POST requests but we set up a routing method to respond to a post request

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
}); // We are echoing back the JSON formatted body of the request message

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
}); // Used to delete a specific campsite

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