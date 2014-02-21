/*
 * GET users listing.
 */

var RegionModel = require('../models/mongoose').RegionModel;
var JSONres;
exports.read = function (req, res) {

    return RegionModel.find(function (err, region) {

        if (!err) {

            JSONres = {
                Result: "OK",
                Records: region

            }


        } else {
            res.statusCode = 500;
            JSONres = {
                Result: "ERROR",
                Record: err

            }


        }
        return res.json(JSONres);
    });

};

exports.create = function (req, res) {
    var reg = new RegionModel({
        name: req.body.name

    });

    reg.save(
        function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: reg

                }


            } else {
                res.statusCode = 500;
                JSONres = {
                    Result: "ERROR",
                    Record: err

                }


            }
            return res.json(JSONres);


        }

    );
};

exports.delete = function (req, res) {

    return RegionModel.findById(req.body._id, function (err, region) {

        if (!region) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return region.remove(function (err) {

            if (!err) {

                JSONres = {
                    Result: "OK"


                }


            } else {
                res.statusCode = 500;
                JSONres = {
                    Result: "ERROR",
                    Record: err

                }


            }
            return res.json(JSONres);
        });
    });


};


exports.update = function(req, res){
    RegionModel.findById(req.body._id, function (err, region) {
        region.name = req.body.name;

        return region.save(function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: region

                }


            } else {
                res.statusCode = 500;
                JSONres = {
                    Result: "ERROR",
                    Record: err

                }


            }

        });
    });
    return res.json(JSONres);
};


exports.show = function (req, res) {
    res.render('region', {
        "title": 'List',
        "region": RegionModel.find()

    });


};