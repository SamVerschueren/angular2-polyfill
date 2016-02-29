import {RouteDefinition} from '../interfaces/RouteDefinition';
import {annotate} from '../../utils';

export function RouteConfig(routes: RouteDefinition[]) {
	return (target: any) => {
		annotate(target, 'routes', routes);
	};
}
