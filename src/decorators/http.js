"use strict";
exports.__esModule = true;
exports.Head = exports.All = exports.Options = exports.Patch = exports.Put = exports.Delete = exports.Get = exports.Post = void 0;
var utils_1 = require("../utils");
var constants_1 = require("../constants");
function handleMethodDecorator(method, path, target, functionName) {
    if (!utils_1.is.String(path)) {
        console.warn("[" + target.constructor.name + " Decorator @" + method + "] parameter must be a string");
        return;
    }
    console.log('方法', method, path, target, functionName, 'target.constructor.name', target.constructor.name);
    var targetConstructor = target.constructor;
    // 函数名
    var funNameArray = Reflect.getMetadata(constants_1.METADATA_KEY.controllerFunctionName, targetConstructor) || [];
    // 函数名去重
    if (!funNameArray.includes(functionName)) {
        funNameArray.push(functionName);
    }
    Reflect.defineMetadata(constants_1.METADATA_KEY.controllerFunctionName, funNameArray, targetConstructor);
    // 路由地址
    var routeArray = Reflect.getMetadata(constants_1.METADATA_KEY.controllerRoutePath, targetConstructor, functionName) || [];
    routeArray.push({
        method: method,
        path: path
    });
    Reflect.defineMetadata(constants_1.METADATA_KEY.controllerRoutePath, routeArray, targetConstructor, functionName);
}
function Post(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.POST, path, target, functionName);
    };
}
exports.Post = Post;
function Get(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.GET, path, target, functionName);
    };
}
exports.Get = Get;
function Delete(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.DELETE, path, target, functionName);
    };
}
exports.Delete = Delete;
function Put(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.PUT, path, target, functionName);
    };
}
exports.Put = Put;
function Patch(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.PATCH, path, target, functionName);
    };
}
exports.Patch = Patch;
function Options(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.OPTIONS, path, target, functionName);
    };
}
exports.Options = Options;
function All(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.ALL, path, target, functionName);
    };
}
exports.All = All;
function Head(path) {
    return function (target, functionName) {
        handleMethodDecorator(constants_1.HTTP_ENUM.HEAD, path, target, functionName);
    };
}
exports.Head = Head;
