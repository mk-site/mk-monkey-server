import { MonkeyServer } from '../index';

(async () => {
    const server = new MonkeyServer({
        pathPattern: [`${process.cwd()}/examples/01-HelloWordld/src`],
    });
    // 加载模块
    await server.binding();
    // 启动服务
    server.listen(5000, () => {
        console.log('开始');
    });
})();