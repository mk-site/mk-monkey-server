import { injectable } from 'inversify';
import { Constructor } from './../typings';
import { TYPES } from '../constants';

// 全局service服务 与 controller的path相对应，自动将服务放入到控制器上下文中
export const timer = () => {
    return function (target: Constructor) {
        injectable()(target);
        const Timers = Reflect.getMetadata(TYPES.Timer, Reflect) || [];
        const newMetada = [target, ...Timers];
        Reflect.defineMetadata(TYPES.Timer, newMetada, Reflect);
    };
};
