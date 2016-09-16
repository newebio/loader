var config = require('./config');
var req = require('./require');
var define = require('./define');
var load = require('./load');
module.exports = () => {
    return {
        config: config,
        define: define,
        load: load,
        require: req,
        sources: {},
        cache: {}
    }
}