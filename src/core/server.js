"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MonkeyServer = void 0;
var events_1 = require("events");
var koa_1 = require("koa");
var path_1 = require("path");
var globby = require("globby");
var inversify_binding_decorators_1 = require("inversify-binding-decorators");
var constants_1 = require("../constants");
var utils_1 = require("./../utils");
var container_1 = require("./container");
var getDefaultOptions = function (obj) {
    return __assign({ name: 'monkey server', apiPrefix: '/api', pathPattern: [], bodyOptions: {}, debug: false, loggerOptions: {} }, obj);
};
var MonkeyServer = /** @class */ (function (_super) {
    __extends(MonkeyServer, _super);
    function MonkeyServer(options) {
        var _this = _super.call(this) || this;
        _this.app = new koa_1["default"]();
        // console.log('服务参数：', options);
        var pathPattern = options.pathPattern || [process.cwd() + "/src"];
        var mergeOptions = getDefaultOptions({ pathPattern: pathPattern });
        (0, utils_1.deepAssign)(mergeOptions, options);
        // @ts-ignore
        _this.options = mergeOptions;
        _this.name = mergeOptions.name || '';
        return _this;
        // console.log('options参数', mergeOptions);
    }
    MonkeyServer.prototype.listen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 监听时进行加载模块
        this.httpServer = this.app.listen.apply(this.app, args);
        return this.httpServer;
    };
    // 初始化绑定数据
    MonkeyServer.prototype.binding = function () {
        return __awaiter(this, void 0, void 0, function () {
            var plugins, _i, plugins_1, plugin, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadFile([path_1["default"].join(__dirname, '../helpers')]);
                        this.loadFile(this.options.pathPattern);
                        plugins = container_1.monkeyContainer.getAll(constants_1.TYPES.PluginClass);
                        console.log('插件列表', plugins);
                        _i = 0, plugins_1 = plugins;
                        _a.label = 1;
                    case 1:
                        if (!(_i < plugins_1.length)) return [3 /*break*/, 4];
                        plugin = plugins_1[_i];
                        return [4 /*yield*/, plugin.initPlugin(this)];
                    case 2:
                        res = _a.sent();
                        if (container_1.monkeyContainer.isBoundNamed(constants_1.TYPES.PluginInstance, plugin.constructor.name)) {
                            container_1.monkeyContainer.bind(constants_1.TYPES.PluginInstance)
                                .toConstantValue(res)
                                .whenTargetNamed(plugin.constructor.name);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // 加载文件并进行绑定
                        container_1.monkeyContainer.load((0, inversify_binding_decorators_1.buildProviderModule)());
                        this.emit('monkey-binding-init', container_1.monkeyContainer);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 加载模块
    MonkeyServer.prototype.loadFile = function (pathArray) {
        try {
            if (Array.isArray(pathArray) && pathArray.length > 0) {
                var pathPattern = pathArray;
                var files = globby.sync(pathPattern);
                var reg_1 = /\.[j|t]s$/;
                files.filter(function (file) {
                    return reg_1.test(file);
                }).map(function (file) {
                    return file.replace(reg_1, '');
                }).forEach(function (file) {
                    console.log('加载文件', file);
                    require(file);
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    return MonkeyServer;
}(events_1.EventEmitter));
exports.MonkeyServer = MonkeyServer;
