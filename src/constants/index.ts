const TYPES = {
    Mk: Symbol.for('Mk'),
    ControllerClass: Symbol.for('Newable<controllerClass>'),
    PLUGINCLASS: Symbol.for('Newable<pluginClass>'),
    Middleware: Symbol.for('Newable<GlobalMiddleware>'),
    Service: Symbol.for('Newable<Service>')
  };
  
  export { TYPES };