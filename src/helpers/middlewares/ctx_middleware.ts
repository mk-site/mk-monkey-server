/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import cors from '@koa/cors';
import { Container } from 'inversify';
import { defineMiddleware } from '../../decorators/middleware';
import { MiddlewareClass, MonkeyContext, MonkeyNext } from '../../typings';
import { MonkeyServer, monkeyContainer } from '../../core';

@defineMiddleware('monkey-koa-ctx')
class MonkeyKoaCtx implements MiddlewareClass {
    public initMiddleware(monkeyServer: MonkeyServer) {
        console.log('初始化 monkey-koa-ctx中间件');
        return async (ctx: MonkeyContext, next: MonkeyNext) => {
            let reqContainer = new Container({
                skipBaseClassChecks: true,
            });
            reqContainer.bind<MonkeyContext>('ctx').toConstantValue(ctx);
            reqContainer.bind<MonkeyServer>('monkeyServer').toConstantValue(monkeyServer);
            ctx.parent = monkeyContainer;
            ctx.reqContainer = reqContainer;
            await next();  
        };
    }
}