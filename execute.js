module.exports = function (name) {
    return _execute.call(undefined, this.require.bind(this), this.sources[name].dependencies, this.sources[name].callback.toString());
}
/* eslint-disable no-unused-vars */
function _execute(require, dependencies) {
    var exports;
    var module = {
        exports: exports
    }
    arguments[2] = arguments[2].trim();
    if (arguments[2]) {
        eval("" + arguments[2].slice(arguments[2].indexOf("{") + 1, arguments[2].lastIndexOf("}")) + "");
    }
    return typeof (exports) === "undefined" ? module.exports : exports;
}