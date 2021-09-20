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
exports.model = void 0;
var inversify_1 = require("inversify");
var constants_1 = require("../constants");
// 全局service服务
var model = function () {
    return function (target) {
        (0, inversify_1.injectable)()(target);
        var Services = Reflect.getMetadata(constants_1.METADATA_KEY.model, Reflect) || [];
        var newMetada = __spreadArray([target], Services, true);
        Reflect.defineMetadata(constants_1.METADATA_KEY.model, newMetada, Reflect);
    };
};
exports.model = model;
