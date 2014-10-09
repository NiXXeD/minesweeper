var db = require('monk')('localhost/db');
var scores = db.get('scores');
var jsonParser = require('body-parser').json({});

module.exports = function(app) {
    app.get('/api/scores', function(req, res) {
        scores.find({}, { sort: { time: 1 } })
            .success(function(data) {
                res.json(data);
            })
            .error(function(err) {
                res.writeHead(500);
                res.end(err.message);
            });
    });

    app.post('/api/scores', jsonParser, function(req, res) {
        scores.insert(req.body)
            .success(function() {
                res.writeHead(200);
                res.end();
            })
            .error(function(err) {
                res.writeHead(500);
                res.end(err.message);
            })
    });
};