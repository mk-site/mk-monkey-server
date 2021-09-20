import { defineMiddleware, MiddlewareClass, Context, Next, MonkeyServer } from '../../../index';

@defineMiddleware('test-article-middleware')
export default class TestArticleKoaCtx implements MiddlewareClass {
    public initMiddleware(monkeyServer: MonkeyServer) {
        console.log('初始化 test-article-middleware中间件----');
        return async (ctx: Context, next: Next) => {
            console.log('执行到测试中间件-1');
            await next();
            console.log(ctx.body);
            console.log('执行到测试中间件-2');
        };
    }
}