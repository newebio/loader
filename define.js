var load = require('./load');
var req = require('./require');
module.exports = (isExecute, name, dependencies, callback) => {
    load(name, dependencies, (err, resolvedName) => {
        if (err) {
            throw err;
        }
        if (isExecute) {
            req(resolvedName);
        }
    });
}