import * as Immutable from "immutable";

type ImmutablePath = (string | number)[];

export class Immune {
	public static makeImmune<T extends {}>(obj: T, onChange: (obj: T) => void): T {
		return this.makeSubImmune(Immutable.fromJS(obj), [], onChange);
	}

	private static makeSubImmune<T extends {}>(baseImmutableObj: Immutable.Map<any, any>, path: ImmutablePath, onChange: (obj: T) => void): T {
		return baseImmutableObj.getIn(path).reduce((immuneObj: {}, value: any, key: string) => {
			const propPath = path.concat([key]);
			Object.defineProperty(immuneObj, key, {
				get: () => {
					const val = baseImmutableObj.getIn(propPath);
					switch (typeof val) {
						case "boolean":
						case "undefined":
						case "number":
						case "string":
						case "symbol":
							return val;
						default:
							return this.makeSubImmune(baseImmutableObj, propPath, onChange);
					}
				},
				set: (val) => {
					onChange(this.makeSubImmune(baseImmutableObj.setIn(propPath, val), [], onChange));
				},
				enumerable: true,
				configurable: false
			});
			return immuneObj;
		}, {} as T);
	}
}