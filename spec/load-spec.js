var mock = require('mock2');
var fixtures = require('fixture2'), f, oldConsoleWarn, oldConsoleError;
describe("Load", () => {
    beforeEach(() => {
        f = fixtures();
        f("webchain", {
            cache: {},
            require: f("require", jasmine.createSpy()),
            sources: {},
            _config: {
                loaders: {

                }
            }
        });
        oldConsoleWarn = global.console.warn;
        oldConsoleError = global.console.error;
        global.console.warn = f("consoleWarn", jasmine.createSpy());
        global.console.error = f("consoleError", jasmine.createSpy());
        f("load", mock.require('./../load', {
            './../resolve-name': f("resolveName", jasmine.createSpy()),
            './../resolve-deps-names': f("resolveDepsNames", jasmine.createSpy())
        }).bind(f("webchain")));
        f("webchain")._config.loaders[f("type1")] = f("loaderConfig", { config: f("loaderConfigValue"), loader: f("loader", jasmine.createSpy()) });
        f("executeCallback", jasmine.createSpy());
        f("resolveDepsNames").and.returnValue(f("resolvedDepsNames", []))
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
        f("resolveDepsNames").and.returnValue(f("resolvedDepsNames"))
        f("load")(f("name"), f("deps", [f("dep1", [f("type1")])]), f("executeCallback"), f("callback"));
        var sources = {};
        sources[f("resolvedName")] = { callback: f("executeCallback"), dependencies: f("resolvedDepsNames") };
        expect(f("webchain").sources).toEqual(sources);
        expect(f("resolveDepsNames").calls.allArgs()).toEqual([[f("deps")]]);
    })
    it("when empty deps, should call callback with resolved name", () => {
        f("resolveName").and.returnValue(f("resolvedName"));
        f("load")(f("name"), [], f("executeCallback"), f("callback"));
        expect(f("callback").calls.allArgs()).toEqual([[null, f("resolvedName")]]);
    })
    it("when not exists loader for dep, should throw error", () => {
        f("resolveDepsNames").and.returnValue(f("resolvedDepsNames", [[f("type2"), "mod1"]]))
        expect(f("load").bind(this, f("name"), f("deps", [f("dep1", [f("type2")])]), f("executeCallback"), f("callback"))).toThrowError("Not found loader for type " + f("type2"));
    })
    it("when all loader exists, should call every loader with config", () => {
        f("resolveDepsNames").and.returnValue(f("resolvedDepsNames", [[f("type1"), f("type1Name")]]));
        f("load")(f("name"), f("deps", [f("dep1", [f("type1", [])])]), f("executeCallback"), f("callback"));
        expect(f("loader").calls.allArgs()).toEqual([[[f("type1Name")], f("loaderConfigValue"), jasmine.any(Function)]])
    })
    it("when loader return error, should throw it", () => {
        f("resolveDepsNames").and.returnValue(f("resolvedDepsNames", [[f("type1"), f("type1Name")]]));
        f("load")(f("name"), f("deps", [f("dep1", [f("type1", [])])]), f("executeCallback"), f("callback"));
        expect(f("loader").calls.argsFor(0)[2].bind(this, f("error"))).toThrowError(f("error"));
    })
    it("when all deps was loaded, should call callback with resolved name", () => {
        f("resolveName").and.returnValue(f("resolvedName"));
        f("resolveDepsNames").and.returnValue(f("resolvedDepsNames",
            [
                [f("type1"), f("type1Name1")],
                [f("type1"), f("type1Name2")]
            ]));
        f("load")(f("name"), f("deps", [f("dep1", [f("type1", [])])]), f("executeCallback"), f("callback"));
        f("loader").calls.argsFor(0)[2]();
        f("loader").calls.argsFor(1)[2]();
        expect(f("callback").calls.allArgs()).toEqual([[null, f("resolvedName")]]);
    })
    afterEach(() => {
        global.console.warn = oldConsoleWarn;
        global.console.error = oldConsoleError;
    })
})