var mock = require('mock2');
var fixtures = require('fixture2'), f, oldConsoleWarn, oldConsoleError;
describe("Load", () => {
    beforeEach(() => {
        f = fixtures();
        oldConsoleWarn = global.console.warn;
        oldConsoleError = global.console.error;
        global.console.warn = f("consoleWarn", jasmine.createSpy());
        global.console.error = f("consoleError", jasmine.createSpy());
        f("load", mock.require('./../load', {
            './../resolve-name': f("resolveName", jasmine.createSpy()),
            './../webchain': f("webchain", {
                cache: {},
                require: f("require", jasmine.createSpy()),
                sources: {},
                config: {
                    resolve: {
                        loaders: {

                        }
                    }
                }
            })
        }
        ));
        f("executeCallback", jasmine.createSpy());
        f("callback", jasmine.createSpy());
    })
    it("when call, should resolve name", () => {
        f("load")(f("name"), [], f("executeCallback"), f("callback"));
        expect(f("resolveName").calls.allArgs()).toEqual([[f("name")]]);
    })
    it("when module already cached, should console warn", () => {
        f("resolveName").and.returnValue(f("resolvedName"));
        f("webchain").cache[f("resolvedName")] = true;
        f("load")(f("name"), [], f("executeCallback"), f("callback"));
        expect(f("consoleWarn").calls.allArgs()).toEqual([["Module " + f("resolvedName") + " already exists in cache"]])
    })
    it("when called, should save callback to sources", () => {
        f("resolveName").and.returnValue(f("resolvedName"));
        f("load")(f("name"), [f("dep1")], f("executeCallback"), f("callback"));
        var sources = {};
        sources[f("resolvedName")] = jasmine.any(Function);
        expect(f("webchain").sources).toEqual(sources);
        f("webchain").sources[f("resolvedName")]();
        var depNames = [""];
        expect(f("executeCallback").calls.allArgs()).toEqual([[depNames]]);
    })
    afterEach(() => {
        global.console.warn = oldConsoleWarn;
        global.console.error = oldConsoleError;
    })
})