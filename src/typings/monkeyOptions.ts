import koaBody from 'koa-body';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
            ? RecursivePartial<T[P]>
            : T[P];
};

export interface ServerOptions {
    middlewares: string[];
    bodyOptions: koaBody.IKoaBodyOptions;
    apiPrefix: string;
    name: string;
    debug?: boolean;
    pathPattern: string[];
    loggerOptions: Record<string, any>;
    [key: string]: any;
}

export type PartialOptions = RecursivePartial<ServerOptions>;