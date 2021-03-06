/**
 * Created by Nick on 21.02.14.
 */

/*
 * GET users listing.
 */

var CountryModel = require('../models/mongoose').CountryModel;
var JSONres;

exports.read = function (req, res) {

    var query = {};
    if (req.body.region) {
        query = {
            region: req.body.region
        };
    }


    return CountryModel.find(query).lean().exec(function (err, country) {



        if (!err) {
            JSONres = {
                Result: "OK",
                Records: country

                    }





            }


         else {
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
    CountryModel.findById(req.body._id, function (err, country) {
        country.name = req.body.name;
        country.region = req.body.region;

        return country.save(function (err) {
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

        });
    });
    return res.json(JSONres);
};

exports.list = function(req, res){
    var counts = [];

    CountryModel.find(function (err, count) {

        if (!err) {

            for(var i in count) {
                console.log(count[i].name);
                counts.push(
                    {
                        DisplayText: count[i].name,
                        Value: count[i]._id
                    }
                );

                JSONres = {
                    Result: "OK",
                    Options: counts
                }
            };

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


exports.show = function (req, res) {
    res.render('country', {
        "title": 'Countries'


    });


};