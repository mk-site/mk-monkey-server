// const { globbySync } = require('globby');
// import * as globby from 'globby';
// const recursive = require('recursive-readdir');
// const { dirname, join } = require('path');

// (() => {
//     // const rootPath =  dirname(require?.main?.filename);
//     // console.log(rootPath);
//     // recursive(`${rootPath}/src/`).then((files) => {
//     //     console.log('文件', files);
//     // }, (e) => {
//     //     console.log(e);
//     // })
//     console.log(globby);
//     // console.log(process.cwd());
//     // console.log(__dirname);
//     // // const rootPath = process.cwd();
//     const res = globby.sync([process.cwd() + '/src']);
//     console.log('res', res);
// })();

import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

router.get('/', (ctx: any, next: any) => {
    // ctx.router available
    console.log('12222', ctx.requestContainer);
    ctx.body = 123;
});

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(5000, () => {
    console.log('开始');
});
