qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

## 安装

1. 首先需要创建一个主应用，因为 qiankun 包就在这里安装，然后再各个子应用中调整一下入口。

2. 主应用/main 包，主应用使用了 react 脚手架

`npm install qiankun`
主应用导入 qiankun 包，引入注册，开启等功能，详细参考[代码](.\main\src\index.js)

3. 子应用分别为 demo-one 与 demo-two，分别使用了 react 脚手架与 vue 脚手架

对入口文件添加 bootstrap/mount/unmount 的生命周期函数，使用`window.__POWERED_BY_QIANKUN__`判断是否是 qiankun 微前端的子项目，对路由添加 react 的 basename 或 vue 的 base。

[react 入口改造](.\demo-one\src\index.tsx)
[vue 入口改造](.\demo-two\src\main.js)

基本上实现 qiankun 的微前端就那么几步，而剩下的就是通信问题、多个微前端同存或缓存的问题、沙盒隔离问题等等。

## 问题

1. 使用 react 脚手架本地开发，不能开启热更新模式，否则 qiankun 会报错，所以要把热更新相关的都关闭了。

```
devServer:{
    historyApiFallback:true,
    hot:false,
    watchContentBase:false,
    liveReload:false
}
----

HotModuleReplacementPlugin注释掉，否则还是会热替换
new webpack.HotModuleReplacementPlugin()

```

2. antd 的 icon 加载报错
   因为 css-in-js 的问题导致 insertBefore 插入 style 节点报错
   取消沙盒模式`start({ sandbox: false });`

3. 主应用多页签切换不同子应用的页面状态保持
   要使用对应技术的缓存技术，如 vue 使用 keep-alive，react 使用[react-activation](https://github.com/793338023/react-activation)等等。
   而应用依赖 url 进行切换微应用，那么微应用只能保持一个，所以可以切换为[手动加载模式](https://qiankun.umijs.org/zh/api/#%E6%89%8B%E5%8A%A8%E5%8A%A0%E8%BD%BD%E5%BE%AE%E5%BA%94%E7%94%A8)`singular:true`。

4. 子应用单独运行图片可以正常显示，在主应用里无法正常显示
   [原因是 webpack 加载资源时未使用正确的 publicPath。](https://qiankun.umijs.org/zh/faq/#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BE%AE%E5%BA%94%E7%94%A8%E5%8A%A0%E8%BD%BD%E7%9A%84%E8%B5%84%E6%BA%90%E4%BC%9A-404%EF%BC%9F)
   `__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;`

当然这只是刚刚入门就遇到的问题，而且根据 qiankun 目前的情况，应该还没到开发体验友好的阶段，目前的实现都是重点都在生产这块，所以 issues 上很多问题都是于开发有关的。

部署这款可以根据公司的部署规则定制，如 nginx 代理实现多应用的跨域问题，或直接在后台设置那些地址允许跨域。

qiankun 对 IE 的限制性也有一些，而且浏览器的兼容性也需要测试一下，如果需要引入 qiankun，当然也可以直接考虑使用 single-spa，当无法驾驭 qiankun 时。

[qiankun 官网](https://qiankun.umijs.org/zh/api/#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE)
[qian issues](https://github.com/umijs/qiankun/issues)

## 总结

qiankun 是为了解决多应用之间形式微前端的一种方案，而且它无关于技术栈的问题，所以也导致一致沙盒隔离而导致不能共享的问题，如果是新老技术项目形成微前端，那么就可以考虑使用 qiankun，但新开的项目，那么可以考虑是否是自己定制会比较符合你需要的业务场景，因为有时使用微前端就是为了独立部署独立开发统一技术栈统一规范等，虽然 qiankun 也可以满足要求，但我还是觉得这个微前端的架子不够成熟，如果出现 BUG 很有可能会无法解决且致命。
