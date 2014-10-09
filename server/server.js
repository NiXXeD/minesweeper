var express = require('express');
var compression = require('compression');
var path = require('path');
var app = express();

//apis
require('./scores/scoresApi')(app);

//logging
app.use(require('morgan')('dev'));

//content
app.use(compression());
app.use(express.static(path.join(__dirname, '../build')));

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.writeHead(404);
    res.end('404: Not found');
});

//start the server
var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

module.exports = app;