import { EventEmitter } from 'events';
import Koa from 'koa';
import { dirname, join } from 'path';
import recursive = require('recursive-readdir');
import { buildProviderModule } from 'inversify-binding-decorators';
import { TYPES } from '../constants';
import { deepAssign } from './../utils';
import { Options, PartialOptions, Server } from './../typings';
import { monkeyContainer } from './container';

const getDefaultOptions = (obj: Record<string, any>) => {
    return {
        name: 'monkey server',
        rootPath: '',
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
    public options: Options;
    public httpServer: Server | undefined;
    constructor(options: PartialOptions) {
        super();
        this.app = new Koa();
        console.log('服务参数：', options);
        const rootPath = options.rootPath || dirname(require?.main?.filename as string);
        const mergeOptions: PartialOptions = getDefaultOptions({ rootPath });
        deepAssign(mergeOptions, options);
        // @ts-ignore
        this.options = mergeOptions;
        this.name = mergeOptions.name || '';
        console.log('options参数', mergeOptions);
    }

    public listen(...args: any): Server {
        this.httpServer = this.app.listen.apply(this.app, args);
        return this.httpServer;
    }

    // 初始化绑定数据
    public async mounted() {
        // 加载文件并进行绑定
        monkeyContainer.load(buildProviderModule());
    }

    // 加载文件
    public async loadFile(path: string) {
        return this._loadFile(join(this.options.rootPath, path));
    }
    private async _loadFile(path: string) {
        return recursive(path).then((files) => {
            return files.filter((file) => {
                return /\.[j|t]s$/.test(file);
            }).map((file) => {
                return file.replace(/\.[j|t]s$/, '');
            }).forEach((file: string) => {
                require(file);
            });
        });      
    }
}

export {
    MonkeyServer,
};

