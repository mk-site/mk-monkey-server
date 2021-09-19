/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import urljoin from 'url-join';
import Router from '@koa/router';
import { is } from '../../utils';
import { plugin } from '../../decorators/plugin';
import { PluginClass, MiddlewareClass, Constructor, ControllerMetadata, MonkeyContext, MonkeyNext } from '../../typings';
import { MonkeyServer, monkeyContainer } from '../../core';
import { METADATA_KEY, TYPES } from '../../constants';

@plugin()
class RouterPlugin implements PluginClass {
    public async initPlugin(monkerServer: MonkeyServer) {
        console.log('初始化路由插件');
        monkerServer.on('monkey-binding-init', () => {
            monkerServer.emit('monkey-router-before');
            const router = new Router({
                prefix: monkerServer.options.apiPrefix || undefined,
            });
            monkerServer.router = router;
            const originControllers: ControllerMetadata[] = Reflect.getMetadata(METADATA_KEY.controller, Reflect);
            const services = Reflect.getMetadata(METADATA_KEY.service, Reflect);
            const controllerMetadatas = originControllers.sort((a, b) => {
                const A = Reflect.getMetadata(METADATA_KEY.controllerPriority, a.target) || 0;
                const B = Reflect.getMetadata(METADATA_KEY.controllerPriority, b.target) || 0;
                return A - B;
            });

            controllerMetadatas.forEach((controllerMetadataItem) => {
                console.log('router controller', controllerMetadataItem);
                const routeFuncs: string[] = Reflect.getMetadata(METADATA_KEY.controllerFunctionName, controllerMetadataItem.target);
                console.log('routeFuncs', routeFuncs);
                routeFuncs.forEach((funcName) => {
                    // @ts-ignore
                    const controllerRoutePathArray: Array<{ path: string, method: string }> = Reflect.getMetadata(
                        METADATA_KEY.controllerRoutePath,
                        controllerMetadataItem.target,
                        funcName,
                    );
                    console.log('controllerRoutePathArray', controllerRoutePathArray);
                    controllerRoutePathArray.forEach((meta) => {
                        const routePath = urljoin('/', controllerMetadataItem.path || '', meta.path).replace(/\/\//g, '/');
                        let middlewares: Array<{ middlewareName: string, options?: Record<string, any> }> = controllerMetadataItem.middlewares || [];
                        const funcNameMiddlewares = Reflect.getMetadata(METADATA_KEY.middlewareName, controllerMetadataItem.target, funcName) || [];
                        middlewares = middlewares.concat(funcNameMiddlewares);
                        // 使用中间件
                        middlewares.forEach((item) => {
                            const mid = monkeyContainer.getNamed<MiddlewareClass>(TYPES.MiddlewareClass, item.middlewareName);
                            if (is.Function(mid.initMiddleware)) {
                                let middlewareFunction: any = mid.initMiddleware(monkerServer);
                                if (is.Function(middlewareFunction)) {
                                    console.log('中间件', middlewareFunction);
                                    if (item.options) {
                                        // @ts-ignore
                                        middlewareFunction = middlewareFunction(options);
                                    }
                                    monkerServer.router.use(routePath, middlewareFunction);
                                }
                            }
                        });

                        // 针对路由加入中间件
                        // 设置路由
                        monkerServer.router[meta.method](
                            routePath,
                            async (ctx: MonkeyContext, next: MonkeyNext) => {
                                ctx.reqContainer.bind<Constructor>(controllerMetadataItem.target.name).to(controllerMetadataItem.target);
                                const instance = ctx.reqContainer.get(controllerMetadataItem.target.name);
                                // @ts-ignore
                                await instance[funcName](ctx, next);
                            },
                        );
                    });
                    
                });

            });


            monkerServer.app.use(router.routes());
            monkerServer.app.use(router.allowedMethods());
        });
    }
}