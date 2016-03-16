# angular2-polyfill

> Angular2 polyfill for Angular1

**Please note, this is a work in progress library**


## Install

```
$ npm install --save angular2-polyfill
```

Or with `jspm`

```
$ jspm install npm:angular2-polyfill
```


## Usage

### AppComponent

The `AppComponent` is the base component for our entire application. The following content is stored in `components/app/app.component.ts`. Because
we are using `ui-router`, the only thing we add as a template is the place where the views should be rendered.

```ts
import {Component} from 'angular2-polyfill/core';
import {RouteConfig} from 'angular2-polyfill/router';
import {HomeComponent} from '../home/home.component';

@Component({
    selector: 'my-app',
    template: '<div ui-view></div>'
})
@RouteConfig([
    { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true }
])
export class AppComponent {

}
```

### HomeComponent

The `HomeComponent` simply renders the title defined in the class. Please note that in the background, we use the `controllerAs` syntax. The value of this property
is consistent with the Angular 1.5 [component](https://docs.angularjs.org/guide/component) value. The following content is stored in `components/home/home.component.ts`.

```ts
import {Component} from 'angular2-polyfill/core'

@Component({
    selector: 'home',
    template: '<h1>{{ $ctrl.title }}</h1>',
	styles: [`
		h1 {
			color: red;
		}
	`]
})
export class HomeComponent {
    private title: string = 'Hello World';
}
```

### Bootstrapping

Use the `bootstrap` method from the `upgrade` platform. This allows you to rewrite your entire application at your own
pace. It accepts the base angular module as first argument, and the component/service/... as second argument. This way, you can
keep the other component as they are now and refactor them in the future.

```ts
import * as angular from 'angular';
import 'angular-ui-router';
import 'reflect-metadata';
import {bootstrap} from 'angular2-polyfill/platform/upgrade';
import {AppComponent} from './components/app/app.component';

const ngModule = angular.module('angular2-polyfill', ['ui.router']);

bootstrap(ngModule, AppComponent);
```

> Note: The `HomeComponent` is being bootstrapped automatically because it is referred to in the `@RouteConfig` decorator of the `AppComponent`.

### index.html

```html
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <my-app></my-app>

    <script src="jspm_packages/system.js"></script>
    <script src="config.js"></script>
    <script>
    System.import('app')
        .then(null, console.error.bind(console));
    </script>
</body>
</html>
```

We are using SystemJS as module loader. Feel free to use something else.


## Decorators

- @Component
- @Directive
- @RouteConfig
- @Injectable
- @Inject
- @Pipe


## Services

### HTTP

- Http

### Routing

- Router
- RouteParams


## Lifecycle hooks

- ngOnInit
- ngOnDestroy


## Examples

### GitHub

- [Tour of Heroes](https://github.com/SamVerschueren/angular2-polyfill-heroes) - Tour of Heroes implementation

### Plunks

- [Tour of Heroes](https://plnkr.co/edit/tV8gO6cPCJlcu49qAwoN) - Tour of Heroes
- [Routing](http://plnkr.co/edit/AdhtnTfA8pnAeFRk2qDE) - Routing example


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
