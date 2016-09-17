module.exports = (deps) => {
    var names = [];
    walk(deps, []);
    function walk(cur, name) {
        name = name.concat(cur[0]);
        if (!cur[1]) {
            names.push(name)
            return;
        }

        if (typeof (cur[1][0]) === "string") {
            cur[1].map((n) => {
                names.push(name.concat(n));
            })
        } else {
            cur[1].map((n) => {
                walk(n, name);
            })
        }
    }
    return names;
}