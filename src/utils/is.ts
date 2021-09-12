/* eslint-disable valid-typeof */

const isType = (type: string) => (value: any):boolean => Object.prototype.toString.call(value) === `[object ${type}]`;

export const is = {
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

export const isEmptyObject = (obj: Object): boolean => is.Object(obj) && Object.keys(obj).length === 0;

export const isEmpty = (val: any): boolean => (is.String(val) && val.trim() === '') || val === undefined || val === null;

export const isInstanceOf = (val: any, base: any): boolean => {
    try {
        return val instanceof base;
    } catch (_e) {
        return false;
    }
};

export function isExistProperty(obj: Object, key: string | number | symbol): boolean {
    return obj.hasOwnProperty(key);
}

export const objectAssignConcat = (target: any, source: any) => {
    for (let i = 0; i < source.length; ++i) {
        if (target.indexOf(source[i]) < 0) {
            target.push(source[i]);
        }
    }
};

export const deepAssign = (target: any, source: any) => {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return {};
    }
    for (let i in source) {
        if (Array.isArray(target[i])) {
            objectAssignConcat(target[i], source[i]);
        } else if (typeof(target[i]) == 'object') {
            deepAssign(target[i], source[i]);
        } else {
            target[i] = source[i];
        }
    }
};



// 深度copy
function deepCopy(obj: any) {
    let buf: any;
    if (is.Array(obj)) {
        buf = [];
        let i: number = obj.length;
        // eslint-disable-next-line no-plusplus
        while (i--) {
            buf[i] = deepCopy(obj[i]);
        }
        return buf;
    }
    if (is.Object(obj)) {
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

export {
    deepCopy,
};
