/**
 * Created by Mykola_Turunov on 2/13/14.
 */

var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './config.json' });

module.exports = nconf;