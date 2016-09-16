module.exports = (webchain, name) => {
    return _execute.call(undefined, webchain.require, webchain.sources[name].toString())
}
function _execute(require) {
    var exports;
    var module = {
        exports: exports
    }
    eval("" + arguments[1].slice(arguments[1].indexOf("{") + 1, arguments[1].lastIndexOf("}")) + "");
    return typeof (exports) === "undefined" ? module.exports : exports;
}