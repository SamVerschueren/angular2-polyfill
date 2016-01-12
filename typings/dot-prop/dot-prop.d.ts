// Type definitions for camelcase
// Project: https://github.com/sindresorhus/dot-prop
// Definitions by: Sam Verschueren <https://github.com/samverschueren>

declare module "dot-prop" {
	export function get(object: any, property: string): any;
	export function set(object: any, property: string, value: any): void;
}
