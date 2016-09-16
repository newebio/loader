module.exports = (deps, name) => {
    var names = [];
    deps.map((d) => {
        if (typeof (name) === "undefined") {
            name = [d[0]];
        } else {
            name.push(d[0]);
        }

    })
    return name;
}