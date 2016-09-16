var webchain = require('./webchain');
var execute = require('./execute');
module.exports = (name) => {
    if (webchain.cache[name]) {
        return webchain.cache[name];
    }
    if (!webchain.sources[name]) {
        throw new Error("Not found module " + name + " for require");
    }
    webchain.cache[name] = execute(name);
    return webchain.cache[name];
}