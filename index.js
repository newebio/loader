
var webchain = require('./webchain');
if (typeof (window) !== "undefined") {
    var define = require('./define');
    window.define = define.bind(undefined, true);
    window.webchain = webchain;
}
if (typeof (module) !== "undefined" && module.exports) {
    module.exports = webchain;
}