/**
 * Created by Mykola_Turunov on 2/27/14.
 */

/**
 * Created by Mykola_Turunov on 2/26/14.
 */

/*
 * GET users listing.
 */

var AuthorModel = require('../models/mongoose').AuthorModel;
var JSONres;
exports.read = function (req, res) {

    AuthorModel.find(function (err, author) {

        if (!err) {

            JSONres = {
                Result: "OK",
                Records: author

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
    var item = new AuthorModel({
        name: req.body.name,
        degree: req.body.degree,
        university: req.body.university


    });

    item.save(
        function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: item

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

    return AuthorModel.findById(req.body._id, function (err, author) {

        if (!author) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return author.remove(function (err) {

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
    AuthorModel.findById(req.body._id, function (err, author) {
        author.name = req.body.name;
        author.degree = req.body.degree;
        author.university = req.body.university;


        return author.save(function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: author

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


//exports.list = function(req, res){
//    var items = [];
//
//    AuthorModel.find(function (err, author) {
//
//        if (!err) {
//
//            for(var i in author) {
//                console.log(author[i].name);
//                items.push(
//                    {
//                        DisplayText: "#" + author[i].month + "'" + author[i].year + " - " + author[i].number ,
//                        Value: author[i]._id
//                    }
//                );
//
//                JSONres = {
//                    Result: "OK",
//                    Options: items
//                }
//
//
//
////                items.push ({
////                    DisplayText: author[i].name,
////                    Value: author[i]._id
////                });
//            };
//
//
//        } else {
//            res.statusCode = 500;
//            JSONres = {
//                Result: "ERROR",
//                Record: err
//
//            }
//
//
//        }
//        return res.json(JSONres);
//    });
//
//
//
//};


exports.show = function (req, res) {
    res.render('author', {
        "title": 'Authors'


    });


};