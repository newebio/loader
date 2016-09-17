var system = require('./system');
if (typeof (window) !== "undefined") {
    window.system = system;
    window.define = system.define.bind(system, true);
}
if (typeof (module) !== "undefined" && module.exports) {
    module.exports = system;
}