import { controller, Get, Context, Next } from '../../../index';

@controller('/detail')
export default class Detail {
    @Get('/a/:id')
    async getDetail(ctx: Context, next: Next) {
        console.log('查询', ctx.params);
        ctx.body = {
            data: {
                a: 1,
                b: 2,
            },
            success: true,
        };
        next();
    }
}