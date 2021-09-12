"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonkeyServer = exports.monkeyContainer = void 0;
var container_1 = require("./container");
Object.defineProperty(exports, "monkeyContainer", { enumerable: true, get: function () { return container_1.monkeyContainer; } });
var server_1 = require("./server");
Object.defineProperty(exports, "MonkeyServer", { enumerable: true, get: function () { return server_1.MonkeyServer; } });
const is_1 = require("utils/is");
console.log(is_1.is);
