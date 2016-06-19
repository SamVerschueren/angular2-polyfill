export class OpaqueToken {
	static id: number = 0;

	private _id: number;

	constructor(private _desc: string) {
		this._id = OpaqueToken.id++;
	}

	toString(): string {
		return `Token ${this._desc} (${this._id})`;
	}
}
