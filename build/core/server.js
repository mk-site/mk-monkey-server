"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonkeyServer = void 0;
const events_1 = require("events");
const constants_1 = require("@/constants");
const utils_1 = require("@/utils");
console.log(constants_1.TYPES, utils_1.deepAssign);
const getDefaultOptions = (obj) => {
    return Object.assign({ name: 'monkey server', rootPath: '' }, obj);
};
class MonkeyServer extends events_1.EventEmitter {
    constructor(options) {
        super();
        console.log('服务参数：', options);
    }
}
exports.MonkeyServer = MonkeyServer;
