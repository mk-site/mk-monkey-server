import { Constructor, PluginClass } from './../typings';
import { injectable } from 'inversify';
import { monkeyContainer } from '../core';
import { TYPES } from '../constants';


export const plugin = () => {
    return function (target: Constructor) {
        injectable()(target);
        monkeyContainer.bind<PluginClass>(TYPES.PluginClass).to(target);
    };
};
