var mock = require('mock2'), f = require('fixture2')();
describe("Singletone", () => {
    it("when require, should export object with all fields", () => {
        var webchain = mock.require('./../webchain', {
            './../load': f("load"),
            './../config': f("config", jasmine.createSpy()),
            './../require': f("require"),
            './../define': f("define"),
            './../execute': f("execute"),
            './../evaluate': f("evaluate")
        });
        expect(webchain).toEqual({
            load: f("load"),
            config: f("config"),
            require: f("require"),
            define: f("define"),
            execute: f("execute"),
            evaluate: f("evaluate"),
            sources: {},
            cache: {}
        })
        expect(f("config").calls.allArgs()).toEqual([[]]);
    })
})