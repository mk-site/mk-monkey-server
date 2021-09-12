import { Constructor } from './../typings';
import { injectable } from 'inversify';
import { SERVICE } from '../constants';


export const service = () => {
    return function (target: Constructor) {
        injectable()(target);
        const Services = Reflect.getMetadata(SERVICE, Reflect) || [];
        const newMetada = [target].concat(Services);
        Reflect.defineMetadata(SERVICE, newMetada, Reflect);
    };
};
