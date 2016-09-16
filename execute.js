var webchain = require('./webchain');
module.exports = (name) => {
    var require = webchain.require;
    var exports = {

    }
    var module = {
        exports: exports
    }
    webchain.sources[name](require, exports, module);
    return module.exports;
}