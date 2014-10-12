var low = require('lowdb');
var db = low('db.json');
var scores = db('scores');
var jsonParser = require('body-parser').json({});

module.exports = function(app) {
    app.get('/api/scores', function(req, res) {
        var val = scores.sortBy('time').value();
        res.json(val);
    });

    app.post('/api/scores', jsonParser, function(req, res) {
        scores.push(req.body);
        res.writeHead(200);
        res.end();
    });
};