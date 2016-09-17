var resolvePath = require('./../paths');
module.exports = function (modulePath, config, callback) {
    var this_ = this;
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', modulePath.join("/") + ".js", true);
    xhr.onload = function () {
        if (this.status !== 200) {
            return callback('Error: ' + this.status);
        }
        this_.evaluate(this.responseText);
        callback();
    }
    xhr.onerror = function () {
        callback('Error: ' + this.status);
    }
    xhr.send();
}