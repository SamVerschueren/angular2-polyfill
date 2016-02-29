import {PipeMetadata} from '../interfaces/PipeMetadata';
import {annotate} from '../../utils';

export function Pipe(pipe: PipeMetadata) {
	return (target: any) => {
		annotate(target, 'pipe', pipe);
	}
}
