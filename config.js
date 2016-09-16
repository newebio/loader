var ajaxLoader = require('./loaders/ajax');
var defaultConfig = {
    resolve: {
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
module.exports = (neweb, opts) => {
    opts = opts || {};
    opts.loaders = opts.loaders || {}
}