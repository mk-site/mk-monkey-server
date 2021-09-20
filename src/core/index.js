"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.MonkeyServer = exports.monkeyContainer = void 0;
var container_1 = require("./container");
__createBinding(exports, container_1, "monkeyContainer");
var server_1 = require("./server");
__createBinding(exports, server_1, "MonkeyServer");
