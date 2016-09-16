
var webchain = require('./webchain');
if (typeof (window) !== "undefined") {
    window.define = webchain.define.bind(undefined, true);
    window.webchain = webchain;
}
if (typeof (module) !== "undefined" && module.exports) {
    module.exports = webchain;
}