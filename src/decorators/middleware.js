"use strict";
exports.__esModule = true;
exports.defineMiddleware = exports.middleware = void 0;
var inversify_1 = require("inversify");
var constants_1 = require("../constants");
var core_1 = require("../core");
// 中间件 用在类方法上
var middleware = function (middlewareName, options) {
    return function (target, propertyKey) {
        var middlewares = Reflect.getMetadata(constants_1.METADATA_KEY.middlewareName, target.constructor, propertyKey) || [];
        middlewares.push({
            middlewareName: middlewareName,
            options: options
        });
        Reflect.defineMetadata(constants_1.METADATA_KEY.middlewareName, middlewares, target.constructor, propertyKey);
    };
};
exports.middleware = middleware;
// 定义中间件 => 用在类上
var defineMiddleware = function (middlewareName) {
    return function (target) {
        (0, inversify_1.injectable)()(target);
        core_1.monkeyContainer.bind(constants_1.TYPES.MiddlewareClass).to(target).whenTargetNamed(middlewareName);
    };
};
exports.defineMiddleware = defineMiddleware;
