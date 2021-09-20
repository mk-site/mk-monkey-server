import { METADATA_KEY } from '../constants';
import { Context, Next } from '../typings';
import { is } from '../utils';

export function json() {
    return function (target: Object, name: string, descriptor: PropertyDescriptor) {
        const oldFun = descriptor.value;
        descriptor.value = async function (ctx: Context, next: Next) {
            const val = await oldFun.call(this, ...arguments);
            if (!is.Object(val)) {
                ctx.body = '返回值不是一个对象';
                console.warn('please return a object');
            } else {
                ctx.body = {
                    ...val,
                };
            }
            await next();
        };
    };
}

export function type(typeVal: string) {
    return function (target: Object, name: string, descriptor: PropertyDescriptor) {
        const oldFun = descriptor.value;
        descriptor.value = async function (ctx: Context, next: Next) {
            await oldFun.call(this, ...arguments);
            ctx.type = typeVal;
            await next();
        };
    };
}

export function header(key: string | Record<string, string>, value?: string) {
    let headerObj: Record<string, string> = {};
    if (is.Object(key)) {
        headerObj = key as Record<string, string>;
    } else if (is.String(key) && value) {
        headerObj[key as string] = value;
    }

    return function (target: Object, name: string, descriptor: PropertyDescriptor) {
        const oldFun = descriptor.value;
        descriptor.value = async function (ctx: Context, next: Next) {
            await oldFun.call(this, ...arguments);
            ctx.set(headerObj);
            await next();
        };
    };
}
