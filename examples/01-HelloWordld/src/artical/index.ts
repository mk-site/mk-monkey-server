/* eslint-disable @typescript-eslint/no-unused-vars */
import { controller, Get, MonkeyContext, MonkeyNext } from '../../../index';

@controller('/artical')
class Artical {
    constructor() {
        console.log('Artical 实例');
    }
    @Get('/get')
    @Get('/get/a')
    async getList(ctx: MonkeyContext, next: MonkeyNext) {
        console.log('查询');
        ctx.body = 123;
        next();
    }
    @Get('/get/body')
    async getListBody(ctx: MonkeyContext, next: MonkeyNext) {
        console.log('查询');
        ctx.body = this.getListTest() + '显示body';
        next();
    }

    getListTest() {
        return '123';
    }
}