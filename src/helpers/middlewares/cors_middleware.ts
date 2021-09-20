/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import cors from '@koa/cors';
import { defineMiddleware } from '../../decorators/middleware';
import { MiddlewareClass } from '../../typings';

@defineMiddleware('monkey-koa-cors')
class KoaCors implements MiddlewareClass {
    public initMiddleware() {
        return cors();
    }
}