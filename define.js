var webchain = require('./webchain');
module.exports = (isExecute, name, dependencies, callback) => {
    webchain.load(name, dependencies, callback, (err, resolvedName) => {
        if (isExecute) {
            webchain.require(resolvedName);
        }
    });
}