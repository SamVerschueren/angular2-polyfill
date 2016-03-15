export interface DirectiveMetadata {
	selector?: string,
	inputs?: string[],
	outputs?: string[],
	host?: {[key: string]: string},
	providers?: any[]
}
