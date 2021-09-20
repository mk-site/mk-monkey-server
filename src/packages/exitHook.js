"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
// from https://github.com/Tapppi/async-exit-hook
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// 应用退出
var noop = function () { };
var defaultOptions = {
    onExitDone: noop,
    onExit: noop,
    asyncTimeoutMs: 10000
};
var ExitHook = /** @class */ (function () {
    function ExitHook(options) {
        this.options = __assign(__assign({}, defaultOptions), options);
    }
    return ExitHook;
}());
exports["default"] = ExitHook;
