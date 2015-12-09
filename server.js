var express = require('express');
var app = express();
var PORT = 8080;

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log('private route hit!');
        next();
    },
    logger: function (req, res, next) {
        console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
        next();
    }
};

// Application-level middleware (as opposed to route-level middleware)
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

// Route-level middleware (second argument)
app.get('/about', middleware.requireAuthentication, function (req, res) {
    res.send('About Us!');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log('Express server started on port: ' + PORT);
});