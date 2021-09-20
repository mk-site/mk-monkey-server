
import { CronJob } from 'cron';
import { MonkeyServer, monkeyContainer } from '../../core';
import { TYPES } from '../../constants';
import { plugin } from '../../decorators';
import { PluginClass, TimerClass } from '../../typings';

@plugin()
export default class Timer implements PluginClass {
    public async initPlugin(monkeyServer: MonkeyServer) {
        monkeyServer.on('monkey-binding-init', () => {
            if (monkeyContainer.isBound(TYPES.Timer)) {
                const timer = monkeyContainer.getAll<TimerClass>(TYPES.Timer);
                timer.forEach(function initTimer(job: TimerClass) {
                    job.initTimer(monkeyServer);
                    let instance: CronJob = new CronJob(
                        job.cronTime,
                        () => {
                            job.onTick(instance, monkeyServer);
                        },
                        () => {
                            if (job.onComplete) job.onComplete(instance, monkeyServer);
                        },
                        job.start || true,
                        job.timeZone || 'Asia/Shanghai',
                        job.context,
                        job.runOnInit || false,
                    );
                });
            }
        });
    }
}