"use strict";
exports.__esModule = true;
exports.monkeyContainer = void 0;
var inversify_1 = require("inversify");
var monkeyContainer = new inversify_1.Container({
    skipBaseClassChecks: true
});
exports.monkeyContainer = monkeyContainer;
