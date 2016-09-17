define([".", ""], [[".", [["test"], ["inc1"]]], ["css", [["css",["main"]]]]], function (dependencies, require) {
    var test = require(dependencies[0]);
    var inc1 = require(dependencies[1]);
    console.log("Hello, " + test + "\n" + inc1);
})