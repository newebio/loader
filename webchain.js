var config = require('./config');
var req = require('./require');
var webchain = {};
webchain.config = config.bind(this, webchain);
webchain.require = req;
module.exports = webchain;