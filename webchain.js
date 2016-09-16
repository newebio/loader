var config = require('./config');
var req = require('./require');
var define = require('./define');
var webchain = {};
webchain.config = config.bind(this, webchain);
webchain.require = req;
webchain.define = define;
module.exports = webchain;