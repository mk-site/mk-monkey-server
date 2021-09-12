import { injectable } from 'inversify';
import { Constructor } from '../typings';
import { CONTROLLER_CLASS, CONTROLLER_MIDDLEWARES, CONTROLLER_PRIORITY } from '../constants';

type TMiddlewareItem = {
    middlewareName: string,
    options?: Record<string, any>
};

export const controller = (
    middlewares?: TMiddlewareItem[],
) => {
    return function (target: Constructor) {
        injectable()(target);
        Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, middlewares, target);
        let controllers = Reflect.getMetadata(CONTROLLER_CLASS, Reflect) || [];
        let newMetadata = [target].concat(controllers);
        Reflect.defineMetadata(CONTROLLER_CLASS, newMetadata, Reflect);
    };
};

export const priority = (value: number) => {
    return function (target: Constructor) {
        Reflect.defineMetadata(CONTROLLER_PRIORITY, value, target);
    };
};