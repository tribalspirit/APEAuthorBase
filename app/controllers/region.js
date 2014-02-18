
/*
 * GET users listing.
 */

var RegionModel  = require('../models/mongoose').RegionModel;

exports.read = function(req, res) {

    return RegionModel.find(function (err, region) {

        if (!err) {
            res.render('region', {
                "title" : 'List',
                "region" : region
            });
        } else {
            res.statusCode = 500;

            return res.send('Server error');
        }
    });

};

exports.create = function(req, res) {
    var reg = new RegionModel({
        name: req.body.name

    });

    reg.save(
        function (err) {
            if (!err) {
                console.log("article created");
                return res.redirect('back');

            } else {
                console.log(err);
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                console.log("feck!");
            }
        }

    );
};

exports.delete = function(req, res) {
    return RegionModel.findById(req.params.id, function (err, region) {
        if(!region) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return region.remove(function (err) {
            if (!err) {
                console.log("article removed");
                return res.redirect('back');
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });


};
