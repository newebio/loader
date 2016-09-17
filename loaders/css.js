var resolvePath = require('./../paths');
module.exports = function (modulePath, config, callback) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', modulePath.join("/") + ".css", true);
    xhr.onload = function () {
        if (this.status !== 200) {
            return callback('Error: ' + this.status);
        }
        var style = document.createElement("style");
        style.innerHTML = this.responseText
        document.querySelector('head').appendChild(style);
        callback();
    }
    xhr.onerror = function () {
        callback('Error: ' + this.status);
    }
    xhr.send();
}