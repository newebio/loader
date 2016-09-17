var fixtures = require('fixture2'), f;
describe("Evaluate", () => {
    beforeEach(() => {
        f = fixtures();
        f("webchain", { define: f("define", jasmine.createSpy()) })
        f("evaluate", require('./../evaluate'));

    })
    it("when call, should eval with define function", () => {
        f("evaluate").call(f("webchain"), f("code", "define(1)"));
        expect(f("define").calls.allArgs()).toEqual([[false, 1]]);
    })
})