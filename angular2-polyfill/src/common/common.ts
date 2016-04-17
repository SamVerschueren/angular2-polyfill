import {AsyncPipe} from './pipes/async.pipe';
import * as utils from '../platform/bootstrap/index';

export function bootstrap(ngModule) {
	utils.bootstrap(ngModule, [AsyncPipe]);
}
