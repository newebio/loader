var mock = require('mock2');
var fixtures = require('fixture2'), f;
describe("Evaluate", () => {
    beforeAll(() => {
        f = fixtures();
        f("evaluate", mock.require('./../evaluate', {
            './../webchain': {
                define: f("define", jasmine.createSpy())
            }
        }));
    })
    it("when call, should eval with define function", () => {
        f("evaluate")(f("code", "define(1)"));
        expect(f("define").calls.allArgs()).toEqual([[false, 1]]);
    })
})