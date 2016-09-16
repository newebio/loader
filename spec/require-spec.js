var mock = require('mock2');
var fixtures = require('fixture2'), f;
describe("Require", () => {
    beforeEach(() => {
        f = fixtures();
        f("require", mock.require('./../require', {
            './../webchain': f("webchain", {
                execute: f("execute", jasmine.createSpy()),
                cache: {},
                sources: {}
            })
        }));
    })
    it("when module cached, should return it from cache", () => {
        f("webchain").cache[f("name")] = f("cached");
        expect(f("require")(f("name"))).toBe(f("cached"));
    })
    it("when not cached and not exists in sources, should throw error", () => {
        expect(f("require").bind(this, f("name1"))).toThrowError("Not found module " + f("name1") + " for require")
    })
    it("when not cached and source exists, should call execute, save to cache and return it", () => {
        f("webchain").sources[f("name")] = f("source1");
        f("execute").and.returnValue(f("exec1"));
        expect(f("require")(f("name"))).toBe(f("exec1"));
        expect(f("webchain").cache[f("name")]).toBe(f("exec1"));
        expect(f("execute").calls.allArgs()).toEqual([[f("name")]]);
    })
})