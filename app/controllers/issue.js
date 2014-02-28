/**
 * Created by Mykola_Turunov on 2/26/14.
 */

/*
 * GET users listing.
 */

var IssueModel = require('../models/mongoose').IssueModel;
var JSONres;
exports.read = function (req, res) {

    IssueModel.find(function (err, issue) {

        if (!err) {

            JSONres = {
                Result: "OK",
                Records: issue

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
    var reg = new IssueModel({
        year: req.body.year,
        month: req.body.month,
        number: req.body.number,
        name: req.body.name,
        description: req.body.description

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

    return IssueModel.findById(req.body._id, function (err, issue) {

        if (!issue) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return issue.remove(function (err) {

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
    IssueModel.findById(req.body._id, function (err, issue) {
        issue.name = req.body.name;
        issue.year = req.body.year;
        issue.month = req.body.month;
        issue.number = req.body.number;
        issue.description = req.body.description;

        return issue.save(function (err) {
            if (!err) {

                JSONres = {
                    Result: "OK",
                    Record: issue

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
    var regs = [];

    IssueModel.find(function (err, issue) {

        if (!err) {

            for(var i in issue) {
                console.log(issue[i].name);
                regs.push(
                    {
                        DisplayText: "#" + issue[i].month + "'" + issue[i].year + " - " + issue[i].number ,
                        Value: issue[i]._id
                    }
                );

                JSONres = {
                    Result: "OK",
                    Options: regs
                }



//                regs.push ({
//                    DisplayText: issue[i].name,
//                    Value: issue[i]._id
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
    res.render('issue', {
        "title": 'Issues'


    });


};