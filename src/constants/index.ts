export const TYPES = {
    Monkey: Symbol.for('Monkey'),
    ControllerClass: Symbol.for('ControllerClass'),
    PluginClass: Symbol.for('PluginClass'),
    PluginInstance: Symbol.for('PluginInstance'),
    MiddlewareClass: Symbol.for('MiddlewareClass'),
    ServiceClass: Symbol.for('ServiceClass'),
    ModelClass: Symbol.for('ModelClass'),
    TimerClass: Symbol.for('TimerClass'),
};

export const METADATA_KEY = {
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
    redirect: 'mk-monkey-server:redirect',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum HTTP_ENUM {
    ALL = 'all',
    DELETE = 'delete',
    GET = 'get',
    HEAD = 'head',
    OPTIONS = 'options',
    PATCH = 'patch',
    POST = 'post',
    PUT = 'put',
}
