/**
 * Created by Nick on 21.02.14.
 */

/*
 * GET users listing.
 */

var CountryModel = require('../models/mongoose').CountryModel;
var JSONres;

exports.read = function (req, res) {

    return CountryModel.find(function (err, country) {

        if (!err) {

            JSONres = {
                Result: "OK",
                Records: country

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
    var country = new CountryModel({
        name: req.body.name,
        region: req.body.region
    });

    country.save(
        function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: country

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

    return CountryModel.findById(req.body._id, function (err, country) {

        if (!country) {
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
    RegionModel.findById(req.body._id, function (err, country) {
        country.name = req.body.name;
        country.region = req.body.region;

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
    res.render('country', {
        "title": 'Countries'


    });


};