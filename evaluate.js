module.exports = function (code) {
    var define = this.define.bind(this, false);
    _evaluate(define, code);
}
/* eslint-disable no-unused-vars */
function _evaluate(define) {
    eval(arguments[1]);
}