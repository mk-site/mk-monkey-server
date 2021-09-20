
import { MonkeyServer } from '../../core';
import { plugin } from '../../decorators';
import { PluginClass } from '../../typings';

@plugin()
export default class LoggerPlugin implements PluginClass {
    public async initPlugin(monkeyServer: MonkeyServer) {
        console.log('LoggerPlugin', monkeyServer);
    }
}