import koaBody from 'koa-body';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
            ? RecursivePartial<T[P]>
            : T[P];
};

export interface Options {
    middlewares: string[];
    bodyOptions: koaBody.IKoaBodyOptions;
    name: string;
    debug?: boolean;
    rootPath: string;
    loggerOptions: Record<string, any>;
    [key: string]: any;
}

export type PartialOptions = RecursivePartial<Options>;