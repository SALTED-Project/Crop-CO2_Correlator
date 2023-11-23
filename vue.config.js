const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // uncomment to bypass CORS - development only
  // also change base URLs in code from 'process.env.VUE_APP_SCORPIO_ENDPOINT' to '/api/'
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VUE_APP_SCORPIO_ENDPOINT,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
})