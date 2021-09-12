"use strict";
/* eslint-disable valid-typeof */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = exports.deepAssign = exports.objectAssignConcat = exports.isExistProperty = exports.isInstanceOf = exports.isEmpty = exports.isEmptyObject = exports.is = void 0;
const isType = (type) => (value) => Object.prototype.toString.call(value) === `[object ${type}]`;
exports.is = {
    Number: isType('Number'),
    String: isType('String'),
    Boolean: isType('Boolean'),
    Null: isType('Null'),
    Undefined: isType('Undefined'),
    Symbol: isType('Symbol'),
    Function: isType('Function'),
    Object: isType('Object'),
    Array: isType('Array'),
};
const isEmptyObject = (obj) => exports.is.Object(obj) && Object.keys(obj).length === 0;
exports.isEmptyObject = isEmptyObject;
const isEmpty = (val) => (exports.is.String(val) && val.trim() === '') || val === undefined || val === null;
exports.isEmpty = isEmpty;
const isInstanceOf = (val, base) => {
    try {
        return val instanceof base;
    }
    catch (_e) {
        return false;
    }
};
exports.isInstanceOf = isInstanceOf;
function isExistProperty(obj, key) {
    return obj.hasOwnProperty(key);
}
exports.isExistProperty = isExistProperty;
const objectAssignConcat = (target, source) => {
    for (let i = 0; i < source.length; ++i) {
        if (target.indexOf(source[i]) < 0) {
            target.push(source[i]);
        }
    }
};
exports.objectAssignConcat = objectAssignConcat;
const deepAssign = (target, source) => {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return {};
    }
    for (let i in source) {
        if (Array.isArray(target[i])) {
            (0, exports.objectAssignConcat)(target[i], source[i]);
        }
        else if (typeof (target[i]) == 'object') {
            (0, exports.deepAssign)(target[i], source[i]);
        }
        else {
            target[i] = source[i];
        }
    }
};
exports.deepAssign = deepAssign;
// 深度copy
function deepCopy(obj) {
    let buf;
    if (exports.is.Array(obj)) {
        buf = [];
        let i = obj.length;
        // eslint-disable-next-line no-plusplus
        while (i--) {
            buf[i] = deepCopy(obj[i]);
        }
        return buf;
    }
    if (exports.is.Object(obj)) {
        buf = {};
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (const k in obj) {
            if (isExistProperty(obj, k)) {
                buf[k] = deepCopy(obj[k]);
            }
        }
        return buf;
    }
    return obj;
}
exports.deepCopy = deepCopy;
