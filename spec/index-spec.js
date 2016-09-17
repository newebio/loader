var mock = require('mock2');
var fixtures = require('fixture2'), f, oldWindow;
describe("Index", () => {
    beforeEach(() => {
        oldWindow = global.window;
        f = fixtures();
        global.window = f("window", {});
        f("system", {
            define: f("define", jasmine.createSpy())
        });
    })
    it("when window exists, should add system and bind define to window-object", () => {
        mock.require("./../index", {
            "./../system": f("system")
        })
        expect(f("window").system).toBe(f("system"));
        expect(f("window").define).toEqual(jasmine.any(Function));
        f("window").define(f("val"));
        expect(f("define").calls.all()).toEqual([{ object: f("system"), args: [true, f("val")], returnValue: undefined }]);
    })
    it("when window not exists, should not throw", () => {
        mock.require("./../index", {
            "./../system": f("system", {
                define: f("define", jasmine.createSpy())
            })
        })
    })
    it("when load as commonjs module, should export system", () => {
        expect(mock.require("./../index", {
            "./../system": f("system", {
                define: f("define", jasmine.createSpy())
            })
        })).toBe(f("system"));
    })
    afterEach(() => {
        global.window = oldWindow;
    })
})