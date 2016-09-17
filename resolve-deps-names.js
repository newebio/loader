module.exports = (deps) => {
    var names = [];
    walk(deps, []);
    function walk(cur, name) {
        name.push(cur[0]);
        if (typeof (cur[1][1]) === "string") {
            cur[1].map((n) => {
                names.push(name.concat(n));
            })
            return;
        }
        walk(cur[1], name);
    }
    return names;
}