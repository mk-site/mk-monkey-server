import { EventEmitter } from 'events';
import Koa from 'koa';
import * as globby from 'globby';
import { buildProviderModule } from 'inversify-binding-decorators';
import { TYPES } from '../constants';
import { deepAssign } from './../utils';
import { Options, PartialOptions, Server } from './../typings';
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
    // [key: string]: any;
    public name!: string;
    public app: Koa;
    public options: Options;
    public httpServer: Server | undefined;
    constructor(options: PartialOptions) {
        super();
        this.app = new Koa();
        console.log('服务参数：', options);
        const pathPattern = options.pathPattern || [`${process.cwd()}/src`];
        const mergeOptions: PartialOptions = getDefaultOptions({ pathPattern });
        deepAssign(mergeOptions, options);
        // @ts-ignore
        this.options = mergeOptions;
        this.name = mergeOptions.name || '';
        console.log('options参数', mergeOptions);
    }

    public listen(): Server {
        // 监听时进行加载模块
        this.mounted();
        this.httpServer = this.app.listen.call(this.app, arguments);
        return this.httpServer;
    }

    // 初始化绑定数据
    public async mounted() {
        this.loadFile();
        // 加载文件并进行绑定
        monkeyContainer.load(buildProviderModule());
    }

    // 加载模块
    public loadFile() {
        try {
            const pathPattern = this.options.pathPattern;
            const files = globby.sync(pathPattern);
            const reg = /\.[j|t]s$/;
            files.filter((file) => {
                return reg.test(file);
            }).map((file) => {
                return file.replace(reg, '');
            }).forEach((file: string) => {
                require(file);
            });
        } catch (error) {
            console.error(error);
        }     
    }
}

export {
    MonkeyServer,
};

