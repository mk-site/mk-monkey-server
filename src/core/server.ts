import { EventEmitter } from 'events';
import Koa from 'koa';
import path from 'path';
import * as globby from 'globby';
import { buildProviderModule } from 'inversify-binding-decorators';
import { ListenOptions } from 'net';
import { TYPES } from '../constants';
import { deepAssign } from './../utils';
import { ServerOptions, PartialOptions, Server, PluginClass } from './../typings';
import { monkeyContainer } from './container';

const getDefaultOptions = (obj: Record<string, any>) => {
    return {
        name: 'monkey server',
        apiPrefix: '/api',
        pathPattern: [],
        bodyOptions: {},
        debug: false,
        loggerOptions: {},
        ...obj,
    };
};

class MonkeyServer extends EventEmitter {
    [key: string]: any;
    public name!: string;
    public app: Koa;
    public options: ServerOptions;
    public httpServer: Server | undefined;
    constructor(options: PartialOptions) {
        super();
        this.app = new Koa();
        const pathPattern = options.pathPattern || [`${process.cwd()}/src`];
        const mergeOptions: PartialOptions = getDefaultOptions({ pathPattern });
        deepAssign(mergeOptions, options);
        // @ts-ignore
        this.options = mergeOptions;
        this.name = mergeOptions.name || '';
    }

    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, hostname?: string, listeningListener?: () => void): Server;
    listen(port: number, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
    listen(handle: any, listeningListener?: () => void): Server;
    public listen(...args: any): Server {
        // ???????????????????????????
        this.httpServer = this.app.listen.apply(this.app, args);
        return this.httpServer;
    }

    // ?????????????????????
    public async binding() {
        this.loadFile([path.join(__dirname, '../helpers')]);
        this.loadFile(this.options.pathPattern);
        const plugins = monkeyContainer.getAll<PluginClass>(TYPES.PluginClass);
        console.log('????????????', plugins);
        for (const plugin of plugins) {
            const res = await plugin.initPlugin(this);
            if (monkeyContainer.isBoundNamed(TYPES.PluginInstance, plugin.constructor.name)) {
                monkeyContainer.bind(TYPES.PluginInstance)
                    .toConstantValue(res)
                    .whenTargetNamed(plugin.constructor.name);
            }
        }
        // ???????????????????????????
        monkeyContainer.load(buildProviderModule());
        this.emit('monkey-binding-init', monkeyContainer);
    }

    // ????????????
    public loadFile(pathArray: string[]) {
        try {
            if (Array.isArray(pathArray) && pathArray.length > 0 ) {
                const pathPattern = pathArray;
                const files = globby.sync(pathPattern);
                const reg = /\.[j|t]s$/;
                files.filter((file) => {
                    return reg.test(file);
                }).map((file) => {
                    return file.replace(reg, '');
                }).forEach((file: string) => {
                    require(file);
                });
            }
        } catch (error) {
            console.error(error);
        }     
    }
}

export {
    MonkeyServer,
};

