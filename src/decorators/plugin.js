"use strict";
exports.__esModule = true;
exports.plugin = void 0;
var inversify_1 = require("inversify");
var core_1 = require("../core");
var constants_1 = require("../constants");
var plugin = function () {
    return function (target) {
        (0, inversify_1.injectable)()(target);
        core_1.monkeyContainer.bind(constants_1.TYPES.PluginClass).to(target);
    };
};
exports.plugin = plugin;
