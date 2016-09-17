define([".", "test"], [[".", [["inc1"]]]], function (dependencies, require, exports, module) {
    module.exports = ("world!") + "\n" + require(dependencies[0]);

})