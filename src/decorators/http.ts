import { is } from '../utils';
import { HTTP_ENUM, METADATA_KEY } from '../constants';


function handleMethodDecorator(method: HTTP_ENUM, path: string, target: Object, functionName: string) {
    if (!is.String(path)) {
        console.warn(`[${target.constructor.name} Decorator @${method}] parameter must be a string`);
        return;
    }
    const targetConstructor = target.constructor;

    // 函数名
    const funNameArray = Reflect.getMetadata(METADATA_KEY.controllerFunctionName, targetConstructor) || [];
    // 函数名去重
    if (!funNameArray.includes(functionName)) {
        funNameArray.push(functionName);
    }
    Reflect.defineMetadata(METADATA_KEY.controllerFunctionName, funNameArray, targetConstructor);

    // 路由地址
    const routeArray = Reflect.getMetadata(METADATA_KEY.controllerRoutePath, targetConstructor, functionName) || [];

    routeArray.push({
        method,
        path,
    });
    Reflect.defineMetadata(METADATA_KEY.controllerRoutePath, routeArray, targetConstructor, functionName);
}


export function Post(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.POST, path, target, functionName);
    };
}

export function Get(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.GET, path, target, functionName);
    };
}

export function Delete(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.DELETE, path, target, functionName);
    };
}

export function Put(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.PUT, path, target, functionName);
    };
}

export function Patch(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.PATCH, path, target, functionName);
    };
}

export function Options(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.OPTIONS, path, target, functionName);
    };
}

export function All(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.ALL, path, target, functionName);
    };
}

export function Head(path: string) {
    return function (target: Object, functionName: string) {
        handleMethodDecorator(HTTP_ENUM.HEAD, path, target, functionName);
    };
}