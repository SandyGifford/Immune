import * as Immutable from "immutable";

type ImmutablePath = (string | number)[];

export class Immune {
	public static makeImmune = <T extends { [key: string]: any }>(obj: T, onChange: (obj: T) => void): T => {
		return Immune.makeSubImmune(Immutable.fromJS(obj), [], onChange);
	}

	public static areEqual = <T>(immuneObj1: T, immuneObj2: T): boolean => {
		return null;
	}

	public static getImmutable = (obj: { [key: string]: any }): Immutable.Iterable<any, any> => {
		return null;
	}

	public static demune = <T extends { [key: string]: any }>(obj: T): T => {
		return null;
	}

	private static makeSubImmune<T extends {[key: string]: any}>(baseImmutableObj: Immutable.Map<any, any>, path: ImmutablePath, onChange: (obj: T) => void): T {
		const immuneObj: T = baseImmutableObj.getIn(path).reduce((immuneObj: {}, value: any, key: string) => {
			const propPath = path.concat([key]);

			Object.defineProperty(immuneObj, key, {
				get: Immune.propertyGetter(baseImmutableObj, propPath, onChange),
				set: (val) => {
					onChange(Immune.makeSubImmune(baseImmutableObj.setIn(propPath, val), [], onChange));
				},
				enumerable: true,
				configurable: false
			});
			return immuneObj;
		}, {} as T);

		return immuneObj;
	}

	private static propertyGetter(baseImmutableObj: Immutable.Map<any, any>, path: ImmutablePath, onChange: (obj: any) => void): () => any {
		return () => {
			const val = baseImmutableObj.getIn(path);

			switch (typeof val) {
				case "boolean":
				case "undefined":
				case "number":
				case "string":
				case "symbol":
					return val;
				default:
					return Immune.makeSubImmune(baseImmutableObj, path, onChange);
			}
		}
	}
}