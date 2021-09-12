import { injectable } from 'inversify';
import { TYPES, MIDDLEWARE_NAME } from '../constants';
import { Constructor } from '../typings';
import { monkeyContainer } from '../core';


// 中间件 用在类方法上
export const middleware = (middlewareName: string, options?: Record<string, any>) => {
    return function (target: object, propertyKey: string) {
        const middlewares = Reflect.getMetadata(MIDDLEWARE_NAME, target.constructor, propertyKey);
        middlewares.push({
            middlewareName,
            options,
        });
        Reflect.defineMetadata(MIDDLEWARE_NAME, middlewares, target.constructor, propertyKey );
    };
};

// 定义中间件 => 用在类上
export const defineMiddleware = (middlewareName: string) => {
    return function (target: Constructor) {
        injectable()(target);
        monkeyContainer.bind<Constructor>(TYPES.Middleware).to(target).whenTargetNamed(middlewareName);
    };
};