【文件监听】

监听文件变化：https://www.jianshu.com/p/a70f7e51493a

fs.watch(dir, (event, filename) => {
  if (filename && event === "change") {
    console.log(`${filename} file Changed`);
  }
});