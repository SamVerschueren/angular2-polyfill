var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("angular2-polyfill/src/core/interfaces/ComponentMetadata", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/utils", ['dot-prop'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var dotProp;
    /**
     * Helper functions
     */
    function annotate(target, key, value) {
        if (!target.__annotations__) {
            target.__annotations__ = {};
        }
        dotProp.set(target.__annotations__, key, value);
    }
    exports_2("annotate", annotate);
    return {
        setters:[
            function (dotProp_1) {
                dotProp = dotProp_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Component", ["angular2-polyfill/src/utils"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var utils_1;
    function Component(component) {
        return function (target) {
            utils_1.annotate(target, 'component', component);
        };
    }
    exports_3("Component", Component);
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/interfaces/DirectiveMetadata", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Directive", ["angular2-polyfill/src/utils"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var utils_2;
    function Directive(options) {
        return function (target) {
            utils_2.annotate(target, 'directive', options);
        };
    }
    exports_5("Directive", Directive);
    return {
        setters:[
            function (utils_2_1) {
                utils_2 = utils_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Inject", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function Inject(token) {
        return function (target, propertyKey, parameterIndex) {
            if (!target.__annotations__) {
                target.__annotations__ = {};
            }
            if (!target.__annotations__.inject) {
                target.__annotations__.inject = [];
            }
            target.__annotations__.inject[parameterIndex] = token;
        };
    }
    exports_6("Inject", Inject);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Injectable", ["angular2-polyfill/src/utils"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var utils_3;
    function Injectable() {
        return function (target) {
            utils_3.annotate(target, 'injectable', true);
        };
    }
    exports_7("Injectable", Injectable);
    return {
        setters:[
            function (utils_3_1) {
                utils_3 = utils_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Input", ["angular2-polyfill/src/utils"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var utils_4;
    function Input(bindingPropertyName) {
        return function (target, propertyKey) {
            utils_4.annotate(target.constructor, "inputs." + propertyKey, bindingPropertyName || propertyKey);
        };
    }
    exports_8("Input", Input);
    return {
        setters:[
            function (utils_4_1) {
                utils_4 = utils_4_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Output", ["angular2-polyfill/src/utils"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var utils_5;
    function Output(bindingPropertyName) {
        return function (target, propertyKey) {
            utils_5.annotate(target.constructor, "outputs." + propertyKey, bindingPropertyName || propertyKey);
        };
    }
    exports_9("Output", Output);
    return {
        setters:[
            function (utils_5_1) {
                utils_5 = utils_5_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/interfaces/PipeMetadata", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/decorators/Pipe", ["angular2-polyfill/src/utils"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var utils_6;
    function Pipe(pipe) {
        return function (target) {
            utils_6.annotate(target, 'pipe', pipe);
        };
    }
    exports_11("Pipe", Pipe);
    return {
        setters:[
            function (utils_6_1) {
                utils_6 = utils_6_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/interfaces/OnInit", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/interfaces/OnDestroy", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/interfaces/PipeTransform", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/core/core", ["angular2-polyfill/src/core/decorators/Component", "angular2-polyfill/src/core/decorators/Directive", "angular2-polyfill/src/core/decorators/Inject", "angular2-polyfill/src/core/decorators/Injectable", "angular2-polyfill/src/core/decorators/Input", "angular2-polyfill/src/core/decorators/Output", "angular2-polyfill/src/core/decorators/Pipe"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters:[
            function (Component_1_1) {
                exports_15({
                    "Component": Component_1_1["Component"]
                });
            },
            function (Directive_1_1) {
                exports_15({
                    "Directive": Directive_1_1["Directive"]
                });
            },
            function (Inject_1_1) {
                exports_15({
                    "Inject": Inject_1_1["Inject"]
                });
            },
            function (Injectable_1_1) {
                exports_15({
                    "Injectable": Injectable_1_1["Injectable"]
                });
            },
            function (Input_1_1) {
                exports_15({
                    "Input": Input_1_1["Input"]
                });
            },
            function (Output_1_1) {
                exports_15({
                    "Output": Output_1_1["Output"]
                });
            },
            function (Pipe_1_1) {
                exports_15({
                    "Pipe": Pipe_1_1["Pipe"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/core", ["angular2-polyfill/src/core/core"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_16(exports);
    }
    return {
        setters:[
            function (core_1_1) {
                exportStar_1(core_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/http/interfaces/RequestOptionsArgs", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/http/interfaces/Response", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/http/http.service", ["angular2-polyfill/core"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_2;
    var Http;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            Http = (function () {
                // Inject good old `$http`
                function Http(http) {
                    this.http = http;
                }
                // // TODO IMPLEMENT
                // request(url: string | Request, options?: RequestOptionsArgs): Promise<Response> {
                //
                // }
                Http.prototype.get = function (url, options) {
                    return this.http.get(url, options);
                };
                Http.prototype.post = function (url, body, options) {
                    return this.http.post(url, body, options);
                };
                Http.prototype.put = function (url, body, options) {
                    return this.http.put(url, body, options);
                };
                Http.prototype.delete = function (url, options) {
                    return this.http.delete(url, options);
                };
                Http.prototype.patch = function (url, body, options) {
                    return this.http.patch(url, body, options);
                };
                Http.prototype.head = function (url, options) {
                    return this.http.head(url, options);
                };
                Http = __decorate([
                    __param(0, core_2.Inject('$http'))
                ], Http);
                return Http;
            }());
            exports_19("Http", Http);
        }
    }
});
System.register("angular2-polyfill/src/http/providers", ["angular2-polyfill/src/http/http.service"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var http_service_1;
    var HTTP_PROVIDERS;
    return {
        setters:[
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            // Export the providers
            exports_20("HTTP_PROVIDERS", HTTP_PROVIDERS = [http_service_1.Http]);
        }
    }
});
System.register("angular2-polyfill/http", ["angular2-polyfill/src/http/http.service", "angular2-polyfill/src/http/providers"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    return {
        setters:[
            function (http_service_2_1) {
                exports_21({
                    "Http": http_service_2_1["Http"]
                });
            },
            function (providers_1_1) {
                exports_21({
                    "HTTP_PROVIDERS": providers_1_1["HTTP_PROVIDERS"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/router/instruction", ["angular2-polyfill/core"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_3;
    var RouteParams, Instruction;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            }],
        execute: function() {
            RouteParams = (function () {
                function RouteParams(stateParams) {
                    this.stateParams = stateParams;
                }
                RouteParams.prototype.get = function (param) {
                    return this.stateParams[param];
                };
                RouteParams = __decorate([
                    __param(0, core_3.Inject('$stateParams'))
                ], RouteParams);
                return RouteParams;
            }());
            exports_22("RouteParams", RouteParams);
            Instruction = (function () {
                function Instruction() {
                }
                return Instruction;
            }());
            exports_22("Instruction", Instruction);
        }
    }
});
System.register("angular2-polyfill/src/router/router", ["angular2-polyfill/core", "angular2-polyfill/src/router/instruction"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_4, instruction_1;
    var Router;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            Router = (function () {
                function Router(state) {
                    this.state = state;
                }
                Router.prototype.isRouteActive = function (instruction) {
                    return this.state.is(instruction._state, instruction.urlParams);
                };
                Router.prototype.navigate = function (linkParams) {
                    return this.state.go(linkParams[0], linkParams[1] || {});
                };
                Router.prototype.renavigate = function () {
                    return this.state.reload(this.state.current);
                };
                Router.prototype.generate = function (linkParams) {
                    var state = linkParams[0];
                    var params = linkParams[1] || {};
                    var url = this.state.href(state, params);
                    var instruction = new instruction_1.Instruction();
                    instruction._state = state;
                    instruction.urlPath = this.state.href(state, params);
                    instruction.urlParams = params;
                    return Promise.resolve(instruction);
                };
                Router = __decorate([
                    __param(0, core_4.Inject('$state'))
                ], Router);
                return Router;
            }());
            exports_23("Router", Router);
        }
    }
});
System.register("angular2-polyfill/src/router/interfaces", [], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/router/decorators/RouteConfig", ["angular2-polyfill/src/utils"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var utils_7;
    function RouteConfig(routes) {
        return function (target) {
            utils_7.annotate(target, 'routes', routes);
        };
    }
    exports_25("RouteConfig", RouteConfig);
    return {
        setters:[
            function (utils_7_1) {
                utils_7 = utils_7_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/router/lifecycle/lifecycle_annotations", ["angular2-polyfill/src/utils"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var utils_8;
    function CanActivate(hook) {
        return function (target) {
            utils_8.annotate(target, 'router.canActivate', hook);
        };
    }
    exports_26("CanActivate", CanActivate);
    return {
        setters:[
            function (utils_8_1) {
                utils_8 = utils_8_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/router/providers", ["angular2-polyfill/src/router/router", "angular2-polyfill/src/router/instruction"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var router_1, instruction_2;
    var ROUTER_PROVIDERS;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (instruction_2_1) {
                instruction_2 = instruction_2_1;
            }],
        execute: function() {
            // Export the providers
            exports_27("ROUTER_PROVIDERS", ROUTER_PROVIDERS = [router_1.Router, instruction_2.RouteParams]);
        }
    }
});
System.register("angular2-polyfill/router", ["angular2-polyfill/src/router/router", "angular2-polyfill/src/router/instruction", "angular2-polyfill/src/router/decorators/RouteConfig", "angular2-polyfill/src/router/lifecycle/lifecycle_annotations", "angular2-polyfill/src/router/providers"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    return {
        setters:[
            function (router_2_1) {
                exports_28({
                    "Router": router_2_1["Router"]
                });
            },
            function (instruction_3_1) {
                exports_28({
                    "RouteParams": instruction_3_1["RouteParams"]
                });
                exports_28({
                    "Instruction": instruction_3_1["Instruction"]
                });
            },
            function (RouteConfig_1_1) {
                exports_28({
                    "RouteConfig": RouteConfig_1_1["RouteConfig"]
                });
            },
            function (lifecycle_annotations_1_1) {
                exports_28({
                    "CanActivate": lifecycle_annotations_1_1["CanActivate"]
                });
            },
            function (providers_2_1) {
                exports_28({
                    "ROUTER_PROVIDERS": providers_2_1["ROUTER_PROVIDERS"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/myFile", [], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var myFile;
    return {
        setters:[],
        execute: function() {
            myFile = (function () {
                function myFile() {
                }
                return myFile;
            }());
            exports_29("myFile", myFile);
        }
    }
});
System.register("angular2-polyfill/test", [], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var test;
    return {
        setters:[],
        execute: function() {
            test = (function () {
                function test() {
                }
                return test;
            }());
            exports_30("test", test);
        }
    }
});
System.register("angular2-polyfill/platform/browser", [], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    function bootstrap(base) {
        throw new Error('Not implemented yet. Please use `angular2-polyfill/platform/upgrade` for now.');
    }
    exports_31("bootstrap", bootstrap);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/platform/bootstrap/core", [], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var bootstrapped;
    function bootstrap(ngModule, component) {
        if (bootstrapped) {
            return;
        }
        bootstrapped = true;
        ngModule.run(['$q', '$window', function ($q, $window) {
                // Create an Angular aware global Promise object
                $window.Promise = function (executor) {
                    return $q(executor);
                };
                $window.Promise.all = $q.all.bind($q);
                $window.Promise.reject = $q.reject.bind($q);
                $window.Promise.resolve = $q.when.bind($q);
                $window.Promise.race = function (promises) {
                    var promiseMgr = $q.defer();
                    var resolve = function (result) {
                        if (promiseMgr) {
                            promiseMgr.resolve(result);
                            promiseMgr = null;
                        }
                    };
                    var reject = function (err) {
                        if (promiseMgr) {
                            promiseMgr.reject(err);
                            promiseMgr = null;
                        }
                    };
                    for (var i = 0; i < promises.length; i++) {
                        promises[i]
                            .then(resolve)
                            .catch(reject);
                    }
                    return promiseMgr.promise;
                };
            }]);
        angular.element(document).ready(function () {
            angular.bootstrap(document, [ngModule.name]);
        });
    }
    exports_32("bootstrap", bootstrap);
    return {
        setters:[],
        execute: function() {
            bootstrapped = false;
        }
    }
});
System.register("angular2-polyfill/src/platform/bootstrap/component", ['camelcase', "angular2-polyfill/src/platform/bootstrap/utils"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var camelcase, utils;
    var map, states;
    function bootstrap(ngModule, target, parentState) {
        var annotations = target.__annotations__;
        var component = annotations.component;
        var name = camelcase(component.selector);
        var styleElements = [];
        var headEl = angular.element(document).find('head');
        if (map[target.name]) {
            return name;
        }
        map[target.name] = component.selector;
        // Bootstrap providers, directives and pipes
        (component.providers || []).forEach(function (provider) { return utils.bootstrapHelper(ngModule, provider); });
        (component.directives || []).forEach(function (directive) { return utils.bootstrapHelper(ngModule, directive); });
        (component.pipes || []).forEach(function (pipe) { return utils.bootstrapHelper(ngModule, pipe); });
        // Define the style elements
        (component.styles || []).forEach(function (style) {
            styleElements.push(angular.element('<style type="text/css">@charset "UTF-8";' + style + '</style>'));
        });
        (component.styleUrls || []).forEach(function (url) {
            styleElements.push(angular.element('<link rel="stylesheet" href="' + url + '">'));
        });
        // Inject the services
        utils.inject(target);
        var hostBindings = utils.parseHosts(component.host || {});
        ngModule
            .controller(target.name, target)
            .directive(name, ['$compile', function ($compile) {
                var directive = {
                    restrict: 'E',
                    scope: {},
                    bindToController: {},
                    controller: target.name,
                    controllerAs: component.exportAs || name,
                    transclude: true,
                    compile: function () {
                        // Prepend all the style elements to the `head` dom element
                        styleElements.forEach(function (el) { return headEl.prepend(el); });
                        return {
                            pre: function (scope, el) {
                                // Bind the hosts
                                utils.bindHostBindings(scope, el, hostBindings, component.exportAs || name);
                                if (target.prototype.ngOnInit) {
                                    // Call the `ngOnInit` lifecycle hook
                                    var init = $compile("<div ng-init=\"" + name + ".ngOnInit();\"></div>")(scope);
                                    el.append(init);
                                }
                                scope.$on('$destroy', function () {
                                    // Remove all the style elements when destroying the directive
                                    styleElements.forEach(function (el) { return el.remove(); });
                                    if (target.prototype.ngOnDestroy) {
                                        // Call the `ngOnDestroy` lifecycle hook
                                        scope[name].ngOnDestroy();
                                    }
                                });
                            }
                        };
                    }
                };
                // Bind inputs and outputs
                utils.bindInput(target, directive);
                utils.bindOutput(target, directive);
                // Set the template
                if (component.template) {
                    directive.template = component.template;
                }
                else {
                    directive.templateUrl = component.templateUrl;
                }
                return directive;
            }]);
        if (annotations.routes) {
            var cmpStates = [];
            annotations.routes.forEach(function (route) {
                var name = route.name || route.as;
                var routerAnnotations = route.component.__annotations__ && route.component.__annotations__.router;
                var state = {
                    name: name,
                    url: route.path,
                    isDefault: route.useAsDefault === true
                };
                // Bootstrap the route component if it's not the same as the target component
                if (route.component.name !== component.name) {
                    bootstrap(ngModule, route.component, state);
                }
                // If the url ends with `/...` this is a non-terminal route and thus is abstract.
                if (state.url.substr(-4) === '/...') {
                    state.url = state.url.substr(0, state.url.length - 4);
                    state.abstract = true;
                }
                // Set the `parent` property if the parent is a non-terminal route
                if (parentState && parentState.url && parentState.url.substr(-4) === '/...') {
                    state.parent = parentState.name;
                }
                // Set the template after we are sure the component has been bootstrapped
                state.template = "<" + map[route.component.name] + "></" + map[route.component.name] + ">";
                // Push the state to the component states
                cmpStates.push(state.name);
                // Keep track of all the application states
                states[name] = state;
                // Attach CanActivate router hook
                if (routerAnnotations && routerAnnotations.canActivate) {
                    var hook = ['Router', '$state', '$stateParams'];
                    if (Object.keys(routerAnnotations.canActivate.prototype).length > 0) {
                        if (!routerAnnotations.canActivate.prototype.routerCanActivate) {
                            throw new Error('@CanActivate class does not implement the `CanActivate` interface.');
                        }
                        hook.push(utils.bootstrapHelper(ngModule, routerAnnotations.canActivate));
                    }
                    hook.push(function (router, $state, $stateParams, handler) {
                        var fn = handler ? handler.routerCanActivate : routerAnnotations.canActivate;
                        // Generate instructions for the previous and next state
                        return Promise.all([
                            router.generate([name, $stateParams]),
                            $state.current.name.length === 0 ? null : router.generate([$state.current.name, $state.params])
                        ]).then(function (instructions) {
                            // Call the routerCanActivate hook with the instructions
                            return Promise.resolve(fn.apply(handler, instructions));
                        }).then(function (result) {
                            if (!result) {
                                // Reject if the result is false
                                return Promise.reject('could not activate');
                            }
                        });
                    });
                    states[name].resolve = {
                        routerCanActivate: hook
                    };
                }
            });
            ngModule.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
                    cmpStates.forEach(function (name) {
                        var state = states[name];
                        $stateProvider.state(name, state);
                        if (state.isDefault) {
                            if (state.parent) {
                                var parentState_1 = states[state.parent];
                                var from = parentState_1.url;
                                while (parentState_1.parent) {
                                    parentState_1 = states[parentState_1.parent];
                                    from = parentState_1.url + from;
                                }
                                $urlRouterProvider.when(from, from + state.url);
                            }
                            else {
                                $urlRouterProvider.otherwise(state.url);
                            }
                        }
                    });
                }]);
        }
        return name;
    }
    exports_33("bootstrap", bootstrap);
    return {
        setters:[
            function (camelcase_1) {
                camelcase = camelcase_1;
            },
            function (utils_9) {
                utils = utils_9;
            }],
        execute: function() {
            map = {};
            states = {};
        }
    }
});
System.register("angular2-polyfill/src/platform/bootstrap/directive", ["angular2-polyfill/src/platform/bootstrap/utils"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var utils;
    function parseSelector(selector) {
        var regex = [
            // {key: 'E', value: /^([a-zA-Z])$/},
            { key: 'A', value: /^\[([a-zA-Z]+)\]$/ },
            { key: 'C', value: /^\.([a-zA-Z]+)$/ }
        ];
        for (var i = 0; i < regex.length; i++) {
            var result = selector.match(regex[i].value);
            if (result !== null) {
                return { restrict: regex[i].key, name: result[1] };
            }
        }
        ;
        throw new Error("Selector " + selector + " could not be parsed");
    }
    function bootstrap(ngModule, target) {
        var annotations = target.__annotations__;
        var directive = annotations.directive;
        var selector = parseSelector(directive.selector);
        var hostBindings = utils.parseHosts(directive.host || {});
        // Inject the services
        utils.inject(target);
        ngModule
            .controller(target.name, target)
            .directive(selector.name, [function () {
                var declaration = {
                    restrict: selector.restrict,
                    scope: {},
                    bindToController: {},
                    controller: target.name,
                    controllerAs: 'ctrl',
                    link: function (scope, el) { return utils.bindHostBindings(scope, el, hostBindings); }
                };
                // Bind inputs and outputs
                utils.bindInput(target, declaration);
                utils.bindOutput(target, declaration);
                return declaration;
            }]);
    }
    exports_34("bootstrap", bootstrap);
    return {
        setters:[
            function (utils_10) {
                utils = utils_10;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/platform/bootstrap/pipe", [], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    function bootstrap(ngModule, target) {
        var pipe = target.__annotations__.pipe;
        ngModule
            .filter(pipe.name, function () {
            if (pipe.pure === false) {
                var instance = new target();
                return instance.transform;
            }
            return target.prototype.transform;
        });
        return pipe.name;
    }
    exports_35("bootstrap", bootstrap);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/platform/bootstrap/injectable", ["angular2-polyfill/src/platform/bootstrap/utils"], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var utils_11;
    function bootstrap(ngModule, target) {
        var name = target.name;
        // Inject the services
        utils_11.inject(target);
        ngModule.service(name, target);
        return name;
    }
    exports_36("bootstrap", bootstrap);
    return {
        setters:[
            function (utils_11_1) {
                utils_11 = utils_11_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/platform/bootstrap/utils", ['camelcase', 'dot-prop', "angular2-polyfill/src/platform/bootstrap/component", "angular2-polyfill/src/platform/bootstrap/directive", "angular2-polyfill/src/platform/bootstrap/pipe", "angular2-polyfill/src/platform/bootstrap/injectable"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var camelcase, dotProp, component_1, directive_1, pipe_1, injectable_1;
    function parseHostBinding(key) {
        var regex = [
            { type: 'attr', regex: /^([a-zA-Z]+)$/ },
            { type: 'prop', regex: /^\[([a-zA-Z\.-]+)\]$/ },
            { type: 'event', regex: /^\(([a-zA-Z]+)\)$/ }
        ];
        for (var i = 0; i < regex.length; i++) {
            var match = key.match(regex[i].regex);
            if (match !== null) {
                return { type: regex[i].type, value: match[1] };
            }
        }
        ;
        return { type: undefined, value: key };
    }
    function applyValueToProperties(el, properties, value) {
        properties.forEach(function (property) {
            var splitted = property.split('.');
            if (splitted.length === 1) {
                // Set the property directly
                el.prop(camelcase(property), value);
            }
            else {
                var root = splitted.shift();
                if (root === 'class') {
                    // Handle adding/removing class names
                    var method = value ? 'addClass' : 'removeClass';
                    el[method](splitted.join('.'));
                }
                else {
                    // Handle deeply nested properties
                    var runner = el.prop(camelcase(root));
                    while (splitted.length > 1) {
                        runner = runner[camelcase(splitted.shift())];
                    }
                    runner[camelcase(splitted.shift())] = value;
                }
            }
        });
    }
    function inject(target) {
        var annotations = target.__annotations__ || {};
        var injectables = [];
        if (annotations.inject) {
            annotations.inject.forEach(function (injectable, index) {
                if (typeof injectable === 'string') {
                    injectables[index] = injectable;
                }
                else if (injectable) {
                    injectables[index] = injectable.name;
                }
            });
        }
        if (Reflect.hasMetadata('design:paramtypes', target)) {
            Reflect.getMetadata('design:paramtypes', target).forEach(function (type, index) {
                if (type.name !== 'Object') {
                    injectables[index] = type.name;
                }
            });
        }
        target.$inject = injectables;
    }
    exports_37("inject", inject);
    function bindInput(target, directive) {
        var annotations = target.__annotations__;
        var component = annotations.component || annotations.directive;
        function signOf(key) {
            if (Reflect.hasMetadata('design:type', target.prototype, key)) {
                var type = Reflect.getMetadata('design:type', target.prototype, key);
                if (type.name === 'String') {
                    return '@';
                }
                else {
                    return '=';
                }
            }
            return '@';
        }
        // Bind all the elements in the `inputs` array
        (component.inputs || []).forEach(function (key) {
            var mapping = key.split(/:[ ]*/);
            directive.bindToController[mapping[0]] = signOf(key) + (mapping[1] || mapping[0]);
        });
        // Bind all the elements in the `@Input` annotation list
        Object.keys(annotations.inputs || {}).forEach(function (key) {
            directive.bindToController[key] = signOf(key) + annotations.inputs[key];
        });
    }
    exports_37("bindInput", bindInput);
    function bindOutput(target, directive) {
        var annotations = target.__annotations__;
        var component = annotations.component || annotations.directive;
        // Bind all the elements in the `outputs` array or in the `@Output` annotation list
        (component.outputs || []).forEach(function (key) {
            var mapping = key.split(/:[ ]*/);
            directive.bindToController[mapping[0]] = '&' + (mapping[1] || mapping[0]);
        });
        Object.keys(annotations.outputs || {}).forEach(function (key) { return directive.bindToController[key] = "&" + annotations.outputs[key]; });
    }
    exports_37("bindOutput", bindOutput);
    function parseHosts(hostBindings) {
        var result = {
            attrs: {},
            events: {},
            props: {
                raw: {},
                expressions: {}
            }
        };
        Object.keys(hostBindings).forEach(function (key) {
            var value = hostBindings[key];
            var parsed = parseHostBinding(key);
            if (parsed.type === 'attr') {
                result.attrs[parsed.value] = value;
            }
            else if (parsed.type === 'event') {
                var handler = value.match(/^([a-zA-Z]+)\((.*?)\)$/);
                var method = handler[1];
                var params = handler[2].length === 0 ? [] : handler[2].split(/,[ ]*/);
                result.events[parsed.value] = { method: method, params: params };
            }
            else if (parsed.type === 'prop') {
                var raw = value.match(/^['"](.*?)['"]$/);
                var map = 'expressions';
                if (raw) {
                    // If the value is escaped, it's a raw value and should be applied directly
                    value = raw[1];
                    map = 'raw';
                }
                result.props[map][value] = result.props[map][value] || [];
                result.props[map][value].push(parsed.value);
            }
        });
        return result;
    }
    exports_37("parseHosts", parseHosts);
    function bindHostBindings(scope, el, hostBindings, controllerAs) {
        if (controllerAs === void 0) { controllerAs = 'ctrl'; }
        // Handle attributes
        Object.keys(hostBindings.attrs).forEach(function (attribute) {
            el.attr(attribute, hostBindings.attrs[attribute]);
        });
        // Handle host listeners
        Object.keys(hostBindings.events).forEach(function (event) {
            var target = hostBindings.events[event];
            el.bind(event, function (e) {
                var ctx = { $event: e };
                // use scope.$apply because we are outside the angular digest cycle
                scope.$apply(function () {
                    scope[controllerAs][target.method].apply(scope[controllerAs], target.params.map(function (param) { return dotProp.get(ctx, param); }));
                });
            });
        });
        // Handle host property bindings
        Object.keys(hostBindings.props.raw).forEach(function (value) {
            var properties = hostBindings.props.raw[value];
            applyValueToProperties(el, properties, value);
        });
        Object.keys(hostBindings.props.expressions).forEach(function (expression) {
            var properties = hostBindings.props.expressions[expression];
            scope.$watch(controllerAs + "." + expression, function (newValue) {
                applyValueToProperties(el, properties, newValue);
            });
        });
    }
    exports_37("bindHostBindings", bindHostBindings);
    function bootstrapHelper(ngModule, target) {
        if (Array.isArray(target)) {
            return target.forEach(function (target) { return bootstrapHelper(ngModule, target); });
        }
        if (target.__annotations__) {
            if (target.__annotations__.component) {
                return component_1.bootstrap(ngModule, target);
            }
            else if (target.__annotations__.directive) {
                return directive_1.bootstrap(ngModule, target);
            }
            else if (target.__annotations__.pipe) {
                return pipe_1.bootstrap(ngModule, target);
            }
        }
        return injectable_1.bootstrap(ngModule, target);
    }
    exports_37("bootstrapHelper", bootstrapHelper);
    return {
        setters:[
            function (camelcase_2) {
                camelcase = camelcase_2;
            },
            function (dotProp_2) {
                dotProp = dotProp_2;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (directive_1_1) {
                directive_1 = directive_1_1;
            },
            function (pipe_1_1) {
                pipe_1 = pipe_1_1;
            },
            function (injectable_1_1) {
                injectable_1 = injectable_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/src/platform/upgrade", ["angular2-polyfill/src/platform/bootstrap/core", "angular2-polyfill/src/platform/bootstrap/utils"], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var core_5, utils_12;
    function bootstrap(ngModule, component, providers) {
        if (providers === void 0) { providers = []; }
        // Bootstrap the core
        core_5.bootstrap(ngModule, component);
        // Bootstrap the app tree
        utils_12.bootstrapHelper(ngModule, component);
        // Bootstrap providers
        providers.forEach(function (provider) { return utils_12.bootstrapHelper(ngModule, provider); });
    }
    exports_38("bootstrap", bootstrap);
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (utils_12_1) {
                utils_12 = utils_12_1;
            }],
        execute: function() {
        }
    }
});
System.register("angular2-polyfill/platform/upgrade", ["angular2-polyfill/src/platform/upgrade"], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    return {
        setters:[
            function (upgrade_1_1) {
                exports_39({
                    "bootstrap": upgrade_1_1["bootstrap"]
                });
            }],
        execute: function() {
        }
    }
});
