var fixtures = require('fixture2'), f;
describe("Define", () => {
    beforeEach(() => {
        f = fixtures();
        f("webchain", {
            load: f("load", jasmine.createSpy()),
            require: f("require", jasmine.createSpy())
        })
        f("define", require('./../define'));
        f("define").call(f("webchain"), true, f("name"), f("deps"), f("callback"));
    })
    it("when define, should call load", () => {
        expect(f("load").calls.allArgs()).toEqual([[f("name"), f("deps"), f("callback"), jasmine.any(Function)]]);
    })
    it("when define entry point, should load, then require", () => {
        f("load").calls.argsFor(0)[3](null, f("resolvedName"));
        expect(f("require").calls.allArgs()).toEqual([[f("resolvedName")]]);
    })
    it("when define dependence, should load and not require", () => {
        f("define").call(f("webchain"), false, f("name"), f("deps"), f("callback"));
        expect(f("require").calls.count()).toBe(0);
    })
})