module.exports = {
  lintOnSave: true,
  publicPath: '/',
  devServer: {
    port: 7001,
    before (app) {
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7100',
        changeOrigin: false, // 是否改变域名
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '小蜜蜂课堂'
      return args
    })
  }
}
