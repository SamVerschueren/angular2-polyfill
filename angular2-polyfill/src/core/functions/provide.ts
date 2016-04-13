import * as camelcase from 'camelcase';
import {Provider, OpaqueToken} from '../core';
import {ProviderMetadata} from '../interfaces/ProviderMetadata';
import {annotate, toInjectorName} from '../../utils';

export function provide(token: any, options: ProviderMetadata): Provider {
	return new Provider(token, options);
}
