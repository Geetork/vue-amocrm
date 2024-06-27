const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/vue-amocrm/" : "/",
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://galinaleespb.amocrm.ru',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
