import { injectable } from 'inversify';
import { Constructor, TMiddlewareItem, ControllerMetadata } from '../typings';
import { METADATA_KEY } from '../constants';

// 控制器可以自动注入model 与 service
export const controller = (
    path?: string,
    middlewares?: TMiddlewareItem[],
) => {
    return function (target: Constructor) {
        const currentMetadata: ControllerMetadata = {
            middlewares,
            path,
            target,
        };
        injectable()(target);
        // Reflect.defineMetadata(METADATA_KEY.controllerMiddlewares, middlewares, target);
        let controllers = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];
        let newMetadata = [currentMetadata, ...controllers];
        Reflect.defineMetadata(METADATA_KEY.controller, newMetadata, Reflect);
    };
};

export const priority = (value: number) => {
    return function (target: Constructor) {
        Reflect.defineMetadata(METADATA_KEY.controllerPriority, value, target);
    };
};