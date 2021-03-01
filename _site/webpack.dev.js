// Based on https://brycewray.com/posts/2019/12/code-comfort-eleventy-webpack/ and
//    https://github.com/brycewray/eleventy_bundler/blob/master/webpack.dev.js

const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './build',
    watchContentBase: true
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      ghostMode: false,
      notify: false,
      watch: true,
      open: false,
      proxy: 'http://localhost:8080/'
    }, {
      reload: false
    })
  ]
})
