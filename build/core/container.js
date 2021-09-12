"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monkeyContainer = void 0;
const inversify_1 = require("inversify");
const monkeyContainer = new inversify_1.Container({
    skipBaseClassChecks: true,
});
exports.monkeyContainer = monkeyContainer;
