/* eslint-disable @typescript-eslint/no-unused-vars */
import { controller, Get, Context, Next, disabled } from '../../../index';
import { inject } from 'inversify';

@controller('/artical')
class Artical {
    // @inject('TestService') public testService: any;
    constructor() {
        console.log('Artical 实例');
    }
    @Get('/get')
    async getList(ctx: Context, next: Next) {
        console.log('查询');
        ctx.body = 123;
        next();
    }
    @Get('/get/body')
    async getListBody(ctx: Context, next: Next) {
        console.log('查询');
        ctx.body = this.getListTest() + '显示body';
        next();
    }

    getListTest() {
        return '123';
    }
}