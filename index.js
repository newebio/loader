var webchain = require('./webchain');
if (typeof (window) !== "undefined") {
    window.webchain = webchain;
    window.define = webchain.define.bind(webchain, true);
}
if (typeof (module) !== "undefined" && module.exports) {
    module.exports = webchain;
}