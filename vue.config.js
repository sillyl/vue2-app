const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // 本地开发开启，生产环境关闭
  devServer: {
    // https://webpack.docschina.org/configuration/dev-server/
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false, // 解决axios 请求Project.reject抛错正常，但webpack-dev-server在页面全屏抛错问题，https://blog.csdn.net/weixin_46525113/article/details/130864747
      },
    },
    port: 8088, // 端口号，如果端口号被占用，会自动提升1
    host: "0.0.0.0", //主机名
    https: false, //协议
    open: true, //启动服务时自动打开浏览器访问
    // proxy: {
    //   "/api": {
    //     target: process.env.VUE_APP_SERVICE_URL,
    //     changeOrigin: true, // 开启代理服务器，
    //     pathRewrite: {
    //       // 将 请求地址前缀 /dev-api 替换为 空的，
    //       // "^/dev-api": "",
    //       "^api": "",
    //     },
    //   },
    // },
  },
  // 按需加载lodash
  chainWebpack: (config) => {
    // config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    config.module
      .rule("swf")
      .test(/\.swf$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
      });
  },
});
