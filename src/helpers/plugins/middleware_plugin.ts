import { is } from './../../utils';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { plugin } from '../../decorators/plugin';
import { PluginClass, MiddlewareClass } from '../../typings';
import { MonkeyServer } from '../../core/server';
import { METADATA_KEY, TYPES } from '../../constants';
import { monkeyContainer } from '../../core';

// 中间件插件
@plugin()
class MiddlewarePlugin implements PluginClass {
    public async initPlugin(monkerServer: MonkeyServer) {
        monkerServer.on('monkey-router-before', () => {
            // if (monkeyContainer.isBound(METADATA_KEY.globalMiddlewares)) {
            // 内置插件
            const innerMiddlewareArray = [
                'monkey-koa-body',
                'monkey-koa-ctx',
            ];
            const middlewaresMergeArray = [...innerMiddlewareArray, ...(monkerServer.options.middlewares || [])];
            middlewaresMergeArray.forEach((middlewareName) => {
                const mid = monkeyContainer.getNamed<MiddlewareClass>(TYPES.MiddlewareClass, middlewareName);
                if (is.Function(mid.initMiddleware)) {
                    const resFunction: any = mid.initMiddleware(monkerServer);
                    if (resFunction) {
                        monkerServer.app.use(resFunction);
                    }
                }
            });
            // }
        });
    }
}