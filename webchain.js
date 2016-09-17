var config = require('./config');
var req = require('./require');
var define = require('./define');
var evaluate = require('./evaluate');
var load = require('./load');
var execute = require('./execute');
var loader = {
    config: config,
    evaluate: evaluate,
    define: define,
    load: load,
    execute: execute,
    require: req,
    sources: {},
    cache: {}
};
loader.config();
module.exports = loader; 