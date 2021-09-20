import { CronJob } from 'cron';
import { MonkeyServer } from '../core';

export interface TimerClass {
    cronTime: string;
    start?: boolean;
    timeZone?: string;
    onTick: (cron: CronJob, monkeyServer: MonkeyServer) => void;
    onComplete?: (cron: CronJob, monkeyServer: MonkeyServer) => void;
    runOnInit?: boolean;
    context?: any;
    initTimer: (monkeyServer: MonkeyServer) => void;
}