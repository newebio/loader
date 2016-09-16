var resolveName = require('./resolve-name');
var resolveDepNames = require('./resolve-deps-names');
var webchain = require('./webchain');
module.exports = (name, dependencies, executeCallback, callback) => {
    var resolvedName = resolveName(name);
    if (typeof (webchain.cache[resolvedName]) !== "undefined") {
        console.warn("Module " + resolvedName + " already exists in cache")
    }
    var depNames = resolveDepNames(dependencies);
    webchain.sources[resolvedName] = executeCallback.bind(undefined, depNames);
    var i = 0;
    if (dependencies.length == 0) {
        callback(null, resolvedName);
        return;
    }
    dependencies.map((dep) => {
        var typeName = dep[0];
        var typeLoaderConfig = webchain.config.resolve.loaders[typeName];
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