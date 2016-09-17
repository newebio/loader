module.exports = function (name) {
    if (this.cache[name]) {
        return this.cache[name];
    }
    if (!this.sources[name]) {
        throw new Error("Not found module " + name + " for require");
    }
    this.cache[name] = this.execute(name);
    return this.cache[name];
}