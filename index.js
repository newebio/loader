
var Webchain = require('./webchain');
var webchain = Webchain();
if (typeof (window) !== "undefined") {
    window.webchain = webchain;
    window.define = webchain.define.bind(undefined, true);
}
if (typeof (module) !== "undefined" && module.exports) {
    module.exports = webchain;
}