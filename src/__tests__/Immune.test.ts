import "jest";
import { Immune } from "../Immune";

describe("makeImmune", () => {
	it("should be able to handle flat objects", () => {
		let check = {};

		const immuneObj = Immune.makeImmune({
			a: 1,
			b: true,
			c: "hello",
			d: undefined,
		}, (newData) => {
		});

		expect(immuneObj.a).toBe(1);
		expect(immuneObj.b).toBe(true);
		expect(immuneObj.c).toBe("hello");
		expect(immuneObj.d).toBe(undefined);

		immuneObj.a = 2;
		immuneObj.b = false;
		immuneObj.c = "world";
		immuneObj.d = {};

		expect(immuneObj.a).toBe(1);
		expect(immuneObj.b).toBe(true);
		expect(immuneObj.c).toBe("hello");
		expect(immuneObj.d).toBe(undefined);
	});
});
