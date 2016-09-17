var ajaxLoader = require('./loaders/ajax');
var cssLoader = require('./loaders/css');
var defaultConfig = {
    loaders: {
        "css": {
            loader: cssLoader,
            config: {
                baseUrl: "/",
                paths: {
                    "*": "*"
                }
            }
        },        
        ".": {
            loader: ajaxLoader,
            config: {
                baseUrl: "/",
                paths: {
                    "*": "*"
                }
            }
        },
        npm: {
            loader: ajaxLoader,
            config: {
                baseUrl: "neweb_modules",
                paths: {
                    "*": "*"
                }
            }
        }
    }
}
module.exports = function (opts) {
    this._config = opts || defaultConfig;
}