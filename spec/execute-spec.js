var fixtures = require('fixture2'), f;
describe("Execute", () => {
    beforeEach(() => {
        f = fixtures();
        f("webchain", {
            require: f("require", jasmine.createSpy()),
            sources: {
                mod1: {
                    callback: f("mod1", function (dependencies, require, exports, module) {
                        exports = require("mod2");
                    }),
                    dependencies: f("depsNames")
                }
            }
        })
        f("execute", require('./../execute').bind(f("webchain")));
    })
    it("when call, should eval as commonjs module and return exports", () => {
        f("require").and.returnValue(f("mod2Export"));
        expect(f("execute")("mod1")).toBe(f("mod2Export"));
    })
})