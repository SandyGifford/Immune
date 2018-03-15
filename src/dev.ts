import { Immune } from "./Immune";

const iO = Immune.makeImmune({
	hello: "world",
	foo: "bar",
	someObj: {
		a: 1,
		b: {
			c: true,
			d: false,
			e: {
				f: 2,
				g: "stuff"
			}
		}
	}
}, (o) =>  console.log("--->", o.hello));

console.log(iO);
console.log(iO.foo);
console.log(iO.someObj.a);
console.log(iO.someObj.b.e.f);

iO.hello = "blah";

console.log(iO.hello);