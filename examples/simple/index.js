define([".", ""], [".", [["test"]]], function (dependencies, require) {
    var test = require(dependencies[0]);

    console.log("Hello, " + test);
})