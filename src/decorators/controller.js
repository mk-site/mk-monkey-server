"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.disabled = exports.priority = exports.controller = void 0;
var inversify_1 = require("inversify");
var constants_1 = require("../constants");
// 控制器可以自动注入model 与 service
var controller = function (path, middlewares) {
    return function (target) {
        var currentMetadata = {
            middlewares: middlewares,
            path: path,
            target: target
        };
        (0, inversify_1.injectable)()(target);
        // Reflect.defineMetadata(METADATA_KEY.controllerMiddlewares, middlewares, target);
        var controllers = Reflect.getMetadata(constants_1.METADATA_KEY.controller, Reflect) || [];
        var newMetadata = __spreadArray([currentMetadata], controllers, true);
        Reflect.defineMetadata(constants_1.METADATA_KEY.controller, newMetadata, Reflect);
    };
};
exports.controller = controller;
var priority = function (value) {
    return function (target) {
        Reflect.defineMetadata(constants_1.METADATA_KEY.controllerPriority, value, target);
    };
};
exports.priority = priority;
var disabled = function () {
    return function (proto, name) {
        console.log('----------disabled', proto, name);
        if (name) {
            var target = proto.constructor;
            // const methodsDisabledArray = Reflect.getMetadata(METADATA_KEY.disabledControllerMethod, target, name) || [];
            // let newMetadata = []
            Reflect.defineMetadata(constants_1.METADATA_KEY.disabledControllerMethod, 'disabled', target, name);
        }
        else {
            // const classDisabledArray = Reflect.getMetadata(METADATA_KEY.disabledController, proto) || [];
            // let newMetadata = []
            Reflect.defineMetadata(constants_1.METADATA_KEY.disabledController, 'disabled', proto);
        }
    };
};
exports.disabled = disabled;
