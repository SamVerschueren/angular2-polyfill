import {AsyncPipe} from './pipes/async.pipe';
import {bootstrapHelper} from '../platform/bootstrap/utils';

export function bootstrap(ngModule) {
	bootstrapHelper(ngModule, [AsyncPipe]);
}
