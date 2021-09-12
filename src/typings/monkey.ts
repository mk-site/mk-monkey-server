import Koa from 'koa';
import { MonkeyServer } from '../core'; 


export interface PluginClass {
    initPlugin: (monkeyServer: MonkeyServer) => Promise<any>;
}

export interface MiddlewareClass {
    initMiddleware: (monkeyServer: MonkeyServer) => Koa.Middleware | void | Function;
}


