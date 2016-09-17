var resolveName = require('./resolve-name');
var resolveDepNames = require('./resolve-deps-names');
module.exports = function (name, dependencies, executeCallback, callback) {
    var resolvedName = resolveName(name);
    if (typeof (this.cache[resolvedName]) !== "undefined") {
        /* eslint-disable no-console */
        //console.warn("Module " + resolvedName + " already exists in cache");
        /* eslint-enable */
    }
    var depNames = resolveDepNames(dependencies);
    this.sources[resolvedName] = {
        callback: executeCallback,
        dependencies: depNames.map((d) => d.join("~"))
    };
    var i = 0;
    if (dependencies.length == 0) {
        callback(null, resolvedName);
        return;
    }
    depNames.map((dep) => {
        var name = resolveName(dep);
        if (typeof (this.cache[name]) !== "undefined") {
            i++;
            if (depNames.length == i) {
                callback(null, resolvedName);
            }
            return;
        }
        this.cache[name] = null;
        var typeName = dep.shift();
        var typeLoaderConfig = this._config.loaders[typeName];
        if (!typeLoaderConfig) {
            throw new Error("Not found loader for type " + typeName);
        }
        typeLoaderConfig.loader.call(this, dep, typeLoaderConfig.config, (err) => {
            if (err) {
                throw new Error(err);
            }
            i++;
            if (depNames.length == i) {
                callback(null, resolvedName);
            }
        })
    })
}