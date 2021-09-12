const TYPES = {
    Monkey: Symbol.for('Monkey'),
    ControllerClass: Symbol.for('controllerClass'),
    PluginClass: Symbol.for('pluginClass'),
    Middleware: Symbol.for('Middleware'),
    Service: Symbol.for('Service'),
};
  
export { TYPES };

// 控制器
export const CONTROLLER_CLASS = 'monkey:controller_class'; // 控制器类
export const CONTROLLER_MIDDLEWARES = 'monkey:controller_middlewares';
export const CONTROLLER_PRIORITY = 'monkey:controller_priority';

// 服务
export const SERVICE = 'monkey:service';

// 中间件
export const MIDDLEWARE_NAME = 'monkey:middleware_name';