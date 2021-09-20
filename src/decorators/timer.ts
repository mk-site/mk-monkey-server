import { injectable } from 'inversify';
import { Constructor, TimerClass } from './../typings';
import { TYPES } from '../constants';
import { monkeyContainer } from '../core';

// 全局service服务 与 controller的path相对应，自动将服务放入到控制器上下文中
export const timer = () => {
    return function (target: Constructor) {
        injectable()(target);
        monkeyContainer.bind<TimerClass>(TYPES.TimerClass).to(target);
    };
};
