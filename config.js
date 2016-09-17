var ajaxLoader = require('./loaders/ajax');
var defaultConfig = {
    loaders: {
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