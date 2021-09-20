/* eslint-disable @typescript-eslint/no-unused-vars */
import { plugin, TimerClass, MonkeyServer, timer, CronJob } from '../../../index';
// @timer()
export default class TestTimer implements TimerClass {
    cronTime!: string;
    start?: boolean | undefined;
    timeZone?: string | undefined;
    runOnInit?: boolean | undefined;
    context?: any;
    async initTimer(monkerServer: MonkeyServer) {
        this.cronTime = '* * * * * *';
    }
    async onComplete(job: CronJob, monkeyServer: MonkeyServer) {
        console.log('timer 任务完成');
    }
    async onTick(job: CronJob, monkeyServer: MonkeyServer) {
        console.log('timer onTick');
    }
}