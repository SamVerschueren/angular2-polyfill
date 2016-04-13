import {ProviderMetadata} from '../interfaces/ProviderMetadata';

export class Provider {

	token: any;
	useClass: any;
	useValue: any;
	useExisting: any;
	useFactory: Function;
	deps: any[];
	multi: boolean;

	constructor(token: any, options: ProviderMetadata) {
		this.token = token;
		this.useClass = options.useClass;
		this.useValue = options.useValue;
		this.useExisting = options.useExisting;
		this.useFactory = options.useFactory;
		this.deps = options.deps;
		this.multi = options.multi;
	}
}
