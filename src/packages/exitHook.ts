/* eslint-disable @typescript-eslint/naming-convention */
// from https://github.com/Tapppi/async-exit-hook

// 应用退出
const noop = function () {};
const defaultOptions = {
    onExitDone: noop,
    onExit: noop,
    asyncTimeoutMs: 10000,
};
type exitFunc = (err: Error | null, callback: () => void) => void;
type exitDoneFunc = (code: number) => void;

interface IExitHookOptions {
    onExit: exitFunc;
    onExitDone?: exitDoneFunc;
    asyncTimeoutMs?: number;
}

class ExitHook {
    public options: IExitHookOptions;
    constructor(options: IExitHookOptions) {
        this.options = { ...defaultOptions, ...options };
    }
}

export default ExitHook;