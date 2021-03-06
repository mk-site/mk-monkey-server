import { injectable } from 'inversify';
import { Constructor } from './../typings';
import { METADATA_KEY } from '../constants';

// 全局service服务 与 controller的path相对应，自动将服务放入到控制器上下文中
export const service = (controllerPath?: string[]) => {
    return function (target: Constructor) {
        injectable()(target);
        const data = {
            target,
            pathArray: controllerPath,
        };
        const Services = Reflect.getMetadata(METADATA_KEY.service, Reflect) || [];
        const newMetada = [data, ...Services];
        Reflect.defineMetadata(METADATA_KEY.service, newMetada, Reflect);
    };
};
