/* eslint-disable @typescript-eslint/no-unused-vars */
import { controller, Get, Context, Next, disabled, interfaces, inject } from '../../../index';
import TestService from '../service/index';

@controller('/test', [{ middlewareName: 'test-article-middleware' }])
class Artical {
    @inject('TestService') public testService!: TestService;
    constructor() {
        console.log('test 实例');
    }
    @Get('/get')
    async getList(ctx: Context, next: Next) {
        console.log('查询', this.testService.getList('123'));
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