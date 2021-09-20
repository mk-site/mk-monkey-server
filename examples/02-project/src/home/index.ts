import { controller, Get, Context, Next } from '../../../index';

@controller('/home')
export default class Detail {
    @Get('/list')
    async getHomeList(ctx: Context, next: Next) {
        console.log('查询列表');
        ctx.body = {
            data: [
                {
                    a: 1,
                    b: 2,
                },
            ],
            success: true,
        };
        next();
    }
}