module.exports = function (name) {
    return _execute.call(undefined, this.require.bind(this), this.sources[name].dependencies, this.sources[name].callback);
}
/* eslint-disable no-unused-vars */
function _execute(require, dependencies) {
    var exports;
    var module = {
        exports: exports
    }
    //Evaluate code, because exports can be set like exports = ...
    /*arguments[2] = arguments[2].trim();
    if (arguments[2]) {
        //Body of function
        //eval("" + arguments[2].slice(arguments[2].indexOf("{") + 1, arguments[2].lastIndexOf("}")) + "");
        eval("(" + arguments[2] + ")(dependencies, require, exports, module)");
    }*/
    arguments[2].call(undefined, dependencies, require, exports, module);
    return typeof (exports) === "undefined" ? module.exports : exports;
}