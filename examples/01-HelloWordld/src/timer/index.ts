/* eslint-disable @typescript-eslint/no-unused-vars */
import { CronJob } from 'cron';
import { plugin, TimerClass, MonkeyServer, timer } from '../../../index';

@timer()
export default class TestTimer implements TimerClass {
    cronTime: string;
    start?: boolean | undefined;
    timeZone?: string | undefined;
    runOnInit?: boolean | undefined;
    context?: any;
    constructor() {
        this.cronTime = '* * * * * *';
    }
    public async initTimer(monkerServer: MonkeyServer) {
        console.log('测试插件');
    }
    public async onComplete() {
        console.log('onComplete');
    }
    public async onTick() {
        console.log('onTick');
    }
}