var resolvePath = require('./../paths');
var evaluate = require('./../evaluate');
module.exports = (modulePath, config, callback) => {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'http://anywhere.com/request', true);
    xhr.onload = function () {
        evaluate(this.responseText);
        callback();
    }
    xhr.onerror = function () {
        callback('Error: ' + this.status);
    }
    xhr.send();
}