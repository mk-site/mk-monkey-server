/* eslint-disable @typescript-eslint/no-unused-vars */
import { plugin } from '../../decorators/plugin';
import { PluginClass, MiddlewareClass } from '../../typings';
import { MonkeyServer } from '../../core/server';
import { METADATA_KEY, TYPES } from '../../constants';
import { monkeyContainer } from '../../core';

// 中间件插件
@plugin()
class ExitHookPlugin implements PluginClass {
    public async initPlugin(monkeyServer: MonkeyServer) {
        console.log('ExitHookPlugin');
    }
}