"use strict";
exports.__esModule = true;
exports.HTTP_ENUM = exports.METADATA_KEY = exports.TYPES = void 0;
exports.TYPES = {
    Monkey: Symbol["for"]('Monkey'),
    ControllerClass: Symbol["for"]('ControllerClass'),
    PluginClass: Symbol["for"]('PluginClass'),
    PluginInstance: Symbol["for"]('PluginInstance'),
    MiddlewareClass: Symbol["for"]('MiddlewareClass'),
    ServiceClass: Symbol["for"]('ServiceClass'),
    ModelClass: Symbol["for"]('ModelClass'),
    Timer: Symbol["for"]('Timer')
};
exports.METADATA_KEY = {
    controller: 'mk-monkey-server:controller',
    controllerPriority: 'mk-monkey-server:controllerPriority',
    globalMiddlewares: 'mk-monkey-server:globalMiddlewares',
    controllerMiddlewares: 'mk-monkey-server:controllerMiddlewares',
    controllerPropertyMiddlewares: 'mk-monkey-server:controllerPropertyMiddlewares',
    controllerFunctionName: 'mk-monkey-server:controllerFunctionName',
    controllerRoutePath: 'mk-monkey-server:controllerRoutePath',
    middlewareName: 'mk-monkey-server:middlewareName',
    service: 'mk-monkey-server:service',
    model: 'mk-monkey-server:model',
    disabledController: 'mk-monkey-server:disabledController',
    disabledControllerMethod: 'mk-monkey-server:disabledControllerMethod',
    redirect: 'mk-monkey-server:redirect'
};
// eslint-disable-next-line @typescript-eslint/naming-convention
var HTTP_ENUM;
(function (HTTP_ENUM) {
    HTTP_ENUM["ALL"] = "all";
    HTTP_ENUM["DELETE"] = "delete";
    HTTP_ENUM["GET"] = "get";
    HTTP_ENUM["HEAD"] = "head";
    HTTP_ENUM["OPTIONS"] = "options";
    HTTP_ENUM["PATCH"] = "patch";
    HTTP_ENUM["POST"] = "post";
    HTTP_ENUM["PUT"] = "put";
})(HTTP_ENUM = exports.HTTP_ENUM || (exports.HTTP_ENUM = {}));
