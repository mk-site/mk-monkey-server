import Koa from 'koa';
import { Container } from 'inversify';
import { MonkeyServer } from '../core'; 


export interface PluginClass {
    initPlugin: (monkeyServer: MonkeyServer) => Promise<any>;
}

export interface MiddlewareClass {
    initMiddleware: (monkeyServer: MonkeyServer) => Koa.Middleware | void | Function;
}

export interface Context extends Koa.Context {
    parent: Container,
    reqContainer: Container,
    [key: string]: any
}

export interface Next extends Koa.Next {}


