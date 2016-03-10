import {RouteDefinition} from '../interfaces';
import {annotate} from '../../utils';

export function RouteConfig(routes: RouteDefinition[]) {
	return (target: any) => {
		annotate(target, 'routes', routes);
	};
}
