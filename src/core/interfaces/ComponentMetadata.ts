export interface ComponentMetadata {
	selector?: string,
	inputs?: string[],
	outputs?: string[],
	exportAs?: string,
	template?: string,
	templateUrl?: string,
	styles?: string[],
	styleUrls?: string[],
	directives?: any[],
	providers?: any[],
	pipes?: any[]
}
