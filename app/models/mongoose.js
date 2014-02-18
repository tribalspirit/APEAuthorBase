/**
 * Created by Mykola_Turunov on 2/13/14.
 */

var mongoose = require('mongoose');
var config = require('../config');

var MONGOHQ_URL="mongodb://user:pass@server.mongohq.com:port_name/db_name"

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

var Schema = mongoose.Schema;

var Region = new Schema({
    name: {
        type: String,
        required: true
    }

});

var Country = new Schema({
    name: {
        type: String,
        required: true
    },

    region: {
        type: Schema.Types.ObjectId, ref: "RegionModel",
        required: true
    }

});

var University = new Schema({
    name: {
        type: String,
        required: true
    },

    country: {
        type: Schema.Types.ObjectId, ref: "CountryModel",
        required: true
    }

});

var Author = new Schema({
    name: {
        type: String,
        required: true
    },

    degree: {
        type: String,
        required: true
    },

    university: {
        type: Schema.Types.ObjectId, ref: "UniversityModel",
        required: true
    },

    imgurl: {
        type: String,
        required: true
    }

});

var Article = new Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    authors: {
        type: [{type: Schema.Types.ObjectId, ref: "AuthorModel"}],
        required: true
    }


});


var Issue = new Schema({
    number: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },

    articles: {
        type: [{type: Schema.Types.ObjectId, ref: "ArticleModel"}],
        required: false

    }

});

// Models
var RegionModel = mongoose.model('region', Region);
var CountryModel = mongoose.model('country', Country);
var UniversityModel = mongoose.model('university', University);
var AuthorModel = mongoose.model('author', Author);
var ArticleModel = mongoose.model('article', Article);
var IssueModel = mongoose.model('issue', Issue);

module.exports.RegionModel = RegionModel;
module.exports.CountryModel = CountryModel;
module.exports.UniversityModel = UniversityModel;
module.exports.AuthorModel = AuthorModel;
module.exports.ArticleModel = ArticleModel;
module.exports.IssueModel = IssueModel;