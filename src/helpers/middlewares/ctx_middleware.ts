/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from 'inversify';
import { defineMiddleware } from '../../decorators/middleware';
import { MiddlewareClass, Context, Next } from '../../typings';
import { MonkeyServer, monkeyContainer } from '../../core';

@defineMiddleware('monkey-koa-ctx')
class MonkeyKoaCtx implements MiddlewareClass {
    public initMiddleware(monkeyServer: MonkeyServer) {
        return async (ctx: Context, next: Next) => {
            let reqContainer = new Container({
                skipBaseClassChecks: true,
            });
            reqContainer.bind<Context>('ctx').toConstantValue(ctx);
            reqContainer.bind<MonkeyServer>('monkeyServer').toConstantValue(monkeyServer);
            ctx.parent = monkeyContainer;
            ctx.reqContainer = reqContainer;
            await next();  
        };
    }
}