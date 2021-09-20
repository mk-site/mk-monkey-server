/* eslint-disable @typescript-eslint/no-unused-vars */
import { service, Context, inject } from '../../../index';

@service(['/test'])
class TestService {
    @inject('ctx')
    public ctx!: Context;
    constructor() {
        console.log('TestService 实例');
    }

    getList(str: string) {
        console.log(this.ctx);
        return 'get list' + str;
    }

    getListTest() {
        return '123';
    }
}

export default TestService;