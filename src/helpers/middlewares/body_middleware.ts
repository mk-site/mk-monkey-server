/* eslint-disable @typescript-eslint/no-unused-vars */
import koaBody from 'koa-body';
import { MonkeyServer } from '../../core/server';
import { defineMiddleware } from '../../decorators/middleware';
import { MiddlewareClass } from '../../typings';

@defineMiddleware('monkey-koa-body')
class KoaBody implements MiddlewareClass {
    public initMiddleware(monkerServer: MonkeyServer) {
        return koaBody(monkerServer.options.bodyOptions);
    }
}