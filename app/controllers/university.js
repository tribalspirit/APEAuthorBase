/**
 * Created by Mykola_Turunov on 2/25/14.
 */

/**
 * Created by Nick on 21.02.14.
 */

/*
 * GET users listing.
 */

var UniversityModel = require('../models/mongoose').UniversityModel;
var JSONres;

exports.read = function (req, res) {


    return UniversityModel.find(function (err, univs) {

        if (!err) {

            JSONres = {
                Result: "OK",
                Records: univs

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
    var univ = new UniversityModel({
        name: req.body.name,
        country: req.body.country
    });

    univ.save(
        function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: univ

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

    return UniversityModel.findById(req.body._id, function (err, univ) {

        if (!univ) {
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
    UniversityModel.findById(req.body._id, function (err, univ) {
        univ.name = req.body.name;
        univ.country = req.body.country;

        return region.save(function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: univ

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
    var formattedList = [];
    var query;

    if (req.params.country) {
        console.log(req.params.country);
        query = {

            country: req.params.country
        };
    }
    console.log(query);
    UniversityModel.find(query,  function (err, rawList) {

        if (!err) {

            for(var i in rawList) {
                console.log(rawList[i].name);
                formattedList.push(
                    {
                        DisplayText: rawList[i].name,
                        Value: rawList[i]._id
                    }
                );

                JSONres = {
                    Result: "OK",
                    Options: formattedList
                }



//                regs.push ({
//                    DisplayText: region[i].name,
//                    Value: region[i]._id
//                });
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
    res.render('university', {
        "title": 'Universities'


    });


};