var resolveName = require('./resolve-name');
var resolveDepNames = require('./resolve-deps-names');
module.exports = function (name, dependencies, executeCallback, callback) {
    var resolvedName = resolveName(name);
    if (typeof (this.cache[resolvedName]) !== "undefined") {
        /* eslint-disable no-console */
        console.warn("Module " + resolvedName + " already exists in cache");
        /* eslint-enable */
    }
    var depNames = resolveDepNames(dependencies);
    this.sources[resolvedName] = {
        callback: executeCallback,
        dependencies: depNames
    };
    var i = 0;
    if (dependencies.length == 0) {
        callback(null, resolvedName);
        return;
    }
    depNames.map((dep) => {
        var typeName = dep[0];
        var typeLoaderConfig = this.config.resolve.loaders[typeName];
        if (!typeLoaderConfig) {
            throw new Error("Not found loader for type " + typeName);
        }
        typeLoaderConfig.loader(dep[1], typeLoaderConfig.config, (err) => {
            if (err) {
                throw new Error(err);
            }
            i++;
            if (dependencies.length == i) {
                callback(null, resolvedName);
            }
        })
    })
}