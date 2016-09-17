describe("Convert dimension array to flat", () => {
    it("simple", () => {
        expect(
            require('./../resolve-deps-names')(["a", ["b", ["c", ["d", "e", "f"]]]])).toEqual(
            [
                ["a", "b", "c", "d"],
                ["a", "b", "c", "e"],
                ["a", "b", "c", "f"]
            ]
            )
    })
})