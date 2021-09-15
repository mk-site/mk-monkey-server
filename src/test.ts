// const { globbySync } = require('globby');
import * as globby from 'globby';
// const recursive = require('recursive-readdir');
// const { dirname, join } = require('path');

(() => {
    // const rootPath =  dirname(require?.main?.filename);
    // console.log(rootPath);
    // recursive(`${rootPath}/src/`).then((files) => {
    //     console.log('文件', files);
    // }, (e) => {
    //     console.log(e);
    // })
    console.log(globby);
    // console.log(process.cwd());
    // console.log(__dirname);
    // // const rootPath = process.cwd();
    const res = globby.sync([process.cwd() + '/src']);
    console.log('res', res);
})();
