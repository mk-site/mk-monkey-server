import Http from 'http';
import Https from 'https';
export * from './monkeyOptions';
export * from './monkey';


export type Server = Http.Server | Https.Server;
export type Constructor<T = any> = new (...args: any[]) => T;
export type ClassFun<T = any> = new (...args: any[]) => T;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type method = 'body' | 'query' | 'params';


