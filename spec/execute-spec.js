var mock = require('mock2');
var fixtures = require('fixture2'), f;
describe("Execute", () => {
    beforeEach(() => {
        f = fixtures();
        f("execute", mock.require('./../execute', {
            './../webchain': {
                require: f("require", jasmine.createSpy()),
                sources: {
                    mod1: f("mod1", function (require, exports, module) {
                        exports = require("mod2");
                    })
                }
            }
        }));
    })
    it("when call, should eval as commonjs module and return exports", () => {
        f("require").and.returnValue(f("mod2Export"));
        expect(f("execute")("mod1")).toBe(f("mod2Export"));
    })
})