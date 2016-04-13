/**
 * Thanks to @cvuorinen for the angular1-async-filter
 * https://github.com/cvuorinen/angular1-async-filter
 */
import {Pipe, PipeTransform} from '../../core/core';

@Pipe({name: 'async', pure: false})
export class AsyncPipe implements PipeTransform {

	private static currentObjectID: number = 0;
	private static values: any = {};
	private static subscriptions: any = {};

	constructor() {

	}

	static objectId(obj) {
		if (!obj.hasOwnProperty('__asyncFilterObjectID__')) {
			obj.__asyncFilterObjectID__ = ++AsyncPipe.currentObjectID;
		}

		return obj.__asyncFilterObjectID__;
	}

	transform(input, [scope]) {
		if (!input || !(input.subscribe || input.then)) {
			return input;
		}

		const inputId = AsyncPipe.objectId(input);
		if (!(inputId in AsyncPipe.subscriptions)) {
			const subscriptionStrategy = input.subscribe && input.subscribe.bind(input)
				|| input.success && input.success.bind(input) // To make it work with HttpPromise
				|| input.then.bind(input);

			AsyncPipe.subscriptions[inputId] = subscriptionStrategy(value => {
				AsyncPipe.values[inputId] = value;

				if (scope && scope.$applyAsync) {
					scope.$applyAsync(); // Automatic safe apply, if scope provided
				}
			});
		}

		return AsyncPipe.values[inputId] || undefined;
	}
}
