var webchain = require('./webchain');
module.exports = (code) => {
    var define = webchain.define.bind(undefined, false);
    _evaluate(define, code);
}
function _evaluate(define) {
    eval(arguments[1]);
}