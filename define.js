module.exports = function (isExecute, name, dependencies, callback) {
    this.load(name, dependencies, callback, (err, resolvedName) => {
        if (isExecute) {
            this.require(resolvedName);
        }
    });
}