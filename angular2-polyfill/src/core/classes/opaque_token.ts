export class OpaqueToken {
	constructor(private _desc: string) {}

	toString(): string {
		return `Token ${this._desc}`;
	}
}
