var Define = require('./define');
module.exports = (code) => {
    var define = Define.bind(undefined, false);
    _evaluate(define, code);
}
function _evaluate(define) {
    eval(arguments[1]);
}