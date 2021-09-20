/* eslint-disable @typescript-eslint/no-unused-vars */
import { plugin } from '../../decorators/plugin';
import { PluginClass } from '../../typings';
import { MonkeyServer } from '../../core/server';
import ExitHook from '../../packages/exitHook';

// 中间件插件
@plugin()
class ExitHookPlugin implements PluginClass {
    public async initPlugin(monkeyServer: MonkeyServer) {
        let exitHook = new ExitHook({
            onExit: (err: Error | null) => {
                console.log('process err:', err);
                monkeyServer.emit('exit', err, monkeyServer);
            },
            onExitDone: (code: number) => {
                console.log(`process exited: ${code}`);
            },
        });
        return exitHook;
    }
}