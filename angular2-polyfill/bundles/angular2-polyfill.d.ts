declare module "angular2-polyfill/src/core/interfaces/ComponentMetadata" {
    export interface ComponentMetadata {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {
            [key: string]: string;
        };
        exportAs?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        directives?: any[];
        providers?: any[];
        pipes?: any[];
    }
}
declare module "angular2-polyfill/src/utils" {
    /**
     * Helper functions
     */
    export function annotate(target: any, key: any, value: any): void;
    export function toInjectorName(token: any): any;
}
declare module "angular2-polyfill/src/core/decorators/Component" {
    import { ComponentMetadata } from "angular2-polyfill/src/core/interfaces/ComponentMetadata";
    export function Component(component: ComponentMetadata): (target: any) => void;
}
declare module "angular2-polyfill/src/core/interfaces/DirectiveMetadata" {
    export interface DirectiveMetadata {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {
            [key: string]: string;
        };
        providers?: any[];
    }
}
declare module "angular2-polyfill/src/core/decorators/Directive" {
    import { DirectiveMetadata } from "angular2-polyfill/src/core/interfaces/DirectiveMetadata";
    export function Directive(options: DirectiveMetadata): (target: any) => void;
}
declare module "angular2-polyfill/src/core/decorators/Inject" {
    export function Inject(token: any): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
}
declare module "angular2-polyfill/src/core/decorators/Injectable" {
    export function Injectable(): (target: any) => void;
}
declare module "angular2-polyfill/src/core/decorators/Input" {
    export function Input(bindingPropertyName?: string): (target: any, propertyKey: string) => void;
}
declare module "angular2-polyfill/src/core/decorators/Output" {
    export function Output(bindingPropertyName?: string): (target: any, propertyKey: string) => void;
}
declare module "angular2-polyfill/src/core/interfaces/PipeMetadata" {
    export interface PipeMetadata {
        name: string;
        pure?: boolean;
    }
}
declare module "angular2-polyfill/src/core/decorators/Pipe" {
    import { PipeMetadata } from "angular2-polyfill/src/core/interfaces/PipeMetadata";
    export function Pipe(pipe: PipeMetadata): (target: any) => void;
}
declare module "angular2-polyfill/src/core/decorators/Optional" {
    export function Optional(token: any): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
}
declare module "angular2-polyfill/src/core/interfaces/ProviderMetadata" {
    export interface ProviderMetadata {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: Function;
        deps?: any[];
        multi?: boolean;
    }
}
declare module "angular2-polyfill/src/core/functions/provide" {
    import { Provider } from "angular2-polyfill/src/core/core";
    import { ProviderMetadata } from "angular2-polyfill/src/core/interfaces/ProviderMetadata";
    export function provide(token: any, options: ProviderMetadata): Provider;
}
declare module "angular2-polyfill/src/core/classes/provider" {
    import { ProviderMetadata } from "angular2-polyfill/src/core/interfaces/ProviderMetadata";
    export class Provider {
        token: any;
        useClass: any;
        useValue: any;
        useExisting: any;
        useFactory: Function;
        deps: any[];
        multi: boolean;
        constructor(token: any, options: ProviderMetadata);
    }
}
declare module "angular2-polyfill/src/core/classes/opaque_token" {
    export class OpaqueToken {
        private _desc;
        constructor(_desc: string);
        toString(): string;
    }
}
declare module "angular2-polyfill/src/core/classes/injector" {
    export class Injector {
        private _injector;
        constructor();
        get(token: any): {};
        getOptional(token: any): {};
    }
}
declare module "angular2-polyfill/src/core/interfaces/OnInit" {
    export interface OnInit {
        ngOnInit(): void;
    }
}
declare module "angular2-polyfill/src/core/interfaces/OnDestroy" {
    export interface OnDestroy {
        ngOnDestroy(): void;
    }
}
declare module "angular2-polyfill/src/core/interfaces/PipeTransform" {
    export interface PipeTransform {
        transform(value: any, args: any[]): any;
    }
}
declare module "angular2-polyfill/src/core/core" {
    export { Component } from "angular2-polyfill/src/core/decorators/Component";
    export { Directive } from "angular2-polyfill/src/core/decorators/Directive";
    export { Inject } from "angular2-polyfill/src/core/decorators/Inject";
    export { Injectable } from "angular2-polyfill/src/core/decorators/Injectable";
    export { Input } from "angular2-polyfill/src/core/decorators/Input";
    export { Output } from "angular2-polyfill/src/core/decorators/Output";
    export { Pipe } from "angular2-polyfill/src/core/decorators/Pipe";
    export { Optional } from "angular2-polyfill/src/core/decorators/Optional";
    export { provide } from "angular2-polyfill/src/core/functions/provide";
    export { Provider } from "angular2-polyfill/src/core/classes/provider";
    export { Injector } from "angular2-polyfill/src/core/classes/injector";
    export { OpaqueToken } from "angular2-polyfill/src/core/classes/opaque_token";
    export { OnInit } from "angular2-polyfill/src/core/interfaces/OnInit";
    export { OnDestroy } from "angular2-polyfill/src/core/interfaces/OnDestroy";
    export { PipeTransform } from "angular2-polyfill/src/core/interfaces/PipeTransform";
}
declare module "angular2-polyfill/core" {
    export * from "angular2-polyfill/src/core/core";
}
declare module "angular2-polyfill/src/http/interfaces/RequestOptionsArgs" {
    export interface RequestOptionsArgs {
        params?: string | any;
        data?: string | any;
        headers?: any;
        xsrfHeaderName?: string;
        xsrfCookieName?: string;
        transformRequest?: Function | Function[];
        transformResponse?: Function | Function[];
        paramSerializer?: string | Function;
        cache?: boolean | any;
        timeout?: number | Promise<any>;
        withCredentials?: boolean;
        responseType?: string;
    }
}
declare module "angular2-polyfill/src/http/interfaces/Response" {
    import { RequestOptionsArgs } from "angular2-polyfill/src/http/interfaces/RequestOptionsArgs";
    export interface Response {
        data: string | any;
        status: number;
        headers: Function;
        config: RequestOptionsArgs;
        statusText: string;
    }
}
declare module "angular2-polyfill/src/http/http.service" {
    import { Observable } from 'rxjs';
    import { RequestOptionsArgs } from "angular2-polyfill/src/http/interfaces/RequestOptionsArgs";
    import { Response } from "angular2-polyfill/src/http/interfaces/Response";
    export class Http {
        private http;
        constructor(http: any);
        get(url: string, options?: RequestOptionsArgs): Observable<Response>;
        post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
        put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
        delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
        patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
        head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    }
}
declare module "angular2-polyfill/src/http/providers" {
    import { Http } from "angular2-polyfill/src/http/http.service";
    export const HTTP_PROVIDERS: typeof Http[];
}
declare module "angular2-polyfill/http" {
    export { Http } from "angular2-polyfill/src/http/http.service";
    export { HTTP_PROVIDERS } from "angular2-polyfill/src/http/providers";
}
declare module "angular2-polyfill/src/router/instruction" {
    export class RouteParams {
        private stateParams;
        constructor(stateParams: any);
        get(param: string): string;
    }
    export class Instruction {
        _state: string;
        urlPath: string;
        urlParams: string;
    }
}
declare module "angular2-polyfill/src/router/router" {
    import { Instruction } from "angular2-polyfill/src/router/instruction";
    export class Router {
        private state;
        constructor(state: any);
        isRouteActive(instruction: Instruction): boolean;
        navigate(linkParams: any[]): Promise<any>;
        renavigate(): Promise<any>;
        generate(linkParams: any[]): Promise<Instruction>;
    }
}
declare module "angular2-polyfill/src/router/interfaces" {
    export interface RouteDefinition {
        path?: string;
        component?: any;
        as?: string;
        name?: string;
        useAsDefault?: boolean;
    }
}
declare module "angular2-polyfill/src/router/decorators/RouteConfig" {
    import { RouteDefinition } from "angular2-polyfill/src/router/interfaces";
    export function RouteConfig(routes: RouteDefinition[]): (target: any) => void;
}
declare module "angular2-polyfill/src/router/lifecycle/lifecycle_annotations" {
    import { Instruction } from "angular2-polyfill/src/router/instruction";
    export function CanActivate(hook: Function | ((next: Instruction, prev: Instruction) => Promise<boolean> | boolean)): (target: any) => void;
    export interface CanActivate {
        routerCanActivate(next: Instruction, prev: Instruction): Promise<boolean> | boolean;
    }
}
declare module "angular2-polyfill/src/router/providers" {
    import { Router } from "angular2-polyfill/src/router/router";
    import { RouteParams } from "angular2-polyfill/src/router/instruction";
    export const ROUTER_PROVIDERS: (typeof Router | typeof RouteParams)[];
}
declare module "angular2-polyfill/router" {
    export { Router } from "angular2-polyfill/src/router/router";
    export { RouteParams } from "angular2-polyfill/src/router/instruction";
    export { Instruction } from "angular2-polyfill/src/router/instruction";
    export { RouteConfig } from "angular2-polyfill/src/router/decorators/RouteConfig";
    export { CanActivate } from "angular2-polyfill/src/router/lifecycle/lifecycle_annotations";
    export * from "angular2-polyfill/src/router/interfaces";
    export { ROUTER_PROVIDERS } from "angular2-polyfill/src/router/providers";
}
declare module "angular2-polyfill/platform/browser" {
    export function bootstrap(base: any): void;
}
declare module "angular2-polyfill/src/platform/bootstrap/core" {
    export function bootstrap(ngModule: any): void;
}
declare module "angular2-polyfill/src/common/pipes/async.pipe" {
    /**
     * Thanks to @cvuorinen for the angular1-async-filter
     * https://github.com/cvuorinen/angular1-async-filter
     */
    import { PipeTransform } from "angular2-polyfill/src/core/core";
    export class AsyncPipe implements PipeTransform {
        private static currentObjectID;
        private static values;
        private static subscriptions;
        constructor();
        static objectId(obj: any): any;
        transform(input: any, [scope]: [any]): any;
    }
}
declare module "angular2-polyfill/src/platform/utils/host" {
    export function parse(hostBindings: {
        string: string;
    }[]): {
        attrs: {};
        events: {};
        props: {
            raw: {};
            expressions: {};
        };
    };
    export function bind(scope: any, el: angular.IRootElementService, hostBindings: any, controllerAs?: string): void;
}
declare module "angular2-polyfill/src/platform/utils/injector" {
    export function inject(ngModule: ng.IModule, target: any): void;
}
declare module "angular2-polyfill/src/platform/utils/input" {
    export function bind(target: any, directive: any): void;
}
declare module "angular2-polyfill/src/platform/utils/output" {
    export function bind(target: any, directive: any): void;
}
declare module "angular2-polyfill/src/platform/bootstrap/component" {
    export function bootstrap(ngModule: any, target: any, parentState?: any): string;
}
declare module "angular2-polyfill/src/platform/bootstrap/directive" {
    export function bootstrap(ngModule: any, target: any): void;
}
declare module "angular2-polyfill/src/platform/bootstrap/multi" {
    export function bootstrapMultiFactory(ngModule: any, name: any, target: any): void;
    export function bootstrapMultiInjectable(ngModule: any, name: any, target: any): void;
    export function bootstrapMultiValue(ngModule: any, name: any, target: any): void;
}
declare module "angular2-polyfill/src/platform/bootstrap/factory" {
    export function bootstrap(ngModule: any, target: any): any;
}
declare module "angular2-polyfill/src/platform/bootstrap/pipe" {
    export function bootstrap(ngModule: any, target: any): any;
}
declare module "angular2-polyfill/src/platform/bootstrap/value" {
    export function bootstrap(ngModule: any, target: any): any;
}
declare module "angular2-polyfill/src/platform/bootstrap/injectable" {
    export function bootstrap(ngModule: any, target: any): any;
}
declare module "angular2-polyfill/src/platform/bootstrap/provider" {
    import { Provider } from "angular2-polyfill/src/core/core";
    export function bootstrap(ngModule: any, provider: Provider): void;
}
declare module "angular2-polyfill/src/platform/bootstrap/index" {
    export function bootstrap(ngModule: any, target: any): any;
}
declare module "angular2-polyfill/src/common/common" {
    export function bootstrap(ngModule: any): void;
}
declare module "angular2-polyfill/src/platform/upgrade" {
    export function bootstrap(ngModule: any, component: any, providers?: any[]): void;
}
declare module "angular2-polyfill/platform/upgrade" {
    export { bootstrap } from "angular2-polyfill/src/platform/upgrade";
}
