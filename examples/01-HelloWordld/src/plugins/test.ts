/* eslint-disable @typescript-eslint/no-unused-vars */
import { plugin, PluginClass, MonkeyServer } from '../../..';

@plugin()
class TestPlugin implements PluginClass {
    public async initPlugin(monkerServer: MonkeyServer) {
        console.log('测试插件');
    }
}