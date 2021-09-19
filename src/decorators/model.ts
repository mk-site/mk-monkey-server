import { Constructor } from './../typings';
import { injectable } from 'inversify';
import { METADATA_KEY } from '../constants';

// 全局service服务
export const model = () => {
    return function (target: Constructor) {
        injectable()(target);
        const Services = Reflect.getMetadata(METADATA_KEY.model, Reflect) || [];
        const newMetada = [target, ...Services];
        Reflect.defineMetadata(METADATA_KEY.model, newMetada, Reflect);
    };
};
