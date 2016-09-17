var mock = require('mock2');
var fixtures = require('fixture2'), f, oldWindow;
describe("Index", () => {
    beforeEach(() => {
        oldWindow = global.window;
        f = fixtures();
        global.window = f("window", {});
        f("webchain", {
            define: f("define", jasmine.createSpy())
        });
    })
    it("when window exists, should add webchain and bind define to window-object", () => {
        mock.require("./../index", {
            "./../webchain": f("webchain")
        })
        expect(f("window").webchain).toBe(f("webchain"));
        expect(f("window").define).toEqual(jasmine.any(Function));
        f("window").define(f("val"));
        expect(f("define").calls.all()).toEqual([{ object: f("webchain"), args: [true, f("val")], returnValue: undefined }]);
    })
    it("when window not exists, should not throw", () => {
        mock.require("./../index", {
            "./../webchain": f("webchain", {
                define: f("define", jasmine.createSpy())
            })
        })
    })
    it("when load as commonjs module, should export webchain", () => {
        expect(mock.require("./../index", {
            "./../webchain": f("webchain", {
                define: f("define", jasmine.createSpy())
            })
        })).toBe(f("webchain"));
    })
    afterEach(() => {
        global.window = oldWindow;
    })
})