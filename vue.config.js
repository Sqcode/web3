'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
// const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'dev',
  lintOnSave: false, // 格式检查
  productionSourceMap: false,
  devServer: {
    // disableHostCheck: true,// 自定义域名访问
    port: 8888,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:10086',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
      // ,
      // [process.env.VUE_APP_BASE_API]: {
      //   target: 'http://127.0.0.1:7777',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'web3',
    // optimization: {
    //   runtimeChunk: true
    // },
    // plugins: [
    //   new ScriptExtHtmlWebpackPlugin({
    //     inline: /runtime~.+\.js$/ //正则匹配runtime文件名
    //   })
    // ],
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('./src/components'),
        utils: resolve('./src/utils'),
        models: resolve('./src/models'),
        router: resolve('./src/router'),
        assets: resolve('./src/assets'),
        api: resolve('./src/api'),
        views: resolve('./src/views')
      }
    }
  }
  // chainWebpack (config) {
  //   config.plugins.delete('preload') // TODO: need test
  //   config.plugins.delete('prefetch') // TODO: need test

  //   // set svg-sprite-loader
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolve('src/icons'))
  //     .end()
  //   config.module
  //     .rule('icons')
  //     .test(/\.svg$/)
  //     .include.add(resolve('src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end()

  //   config
  //     // https://webpack.js.org/configuration/devtool/#development
  //     .when(process.env.NODE_ENV === 'development',
  //       // config => config.devtool('cheap-source-map')
  //       config => config.devtool('source-map')
  //     )

  //   config
  //     .when(process.env.NODE_ENV !== 'development',
  //       config => {
  //         config
  //           .plugin('ScriptExtHtmlWebpackPlugin')
  //           .after('html')
  //           .use('script-ext-html-webpack-plugin', [{
  //             // `runtime` must same as runtimeChunk name. default is `runtime`
  //             inline: /runtime\..*\.js$/
  //           }])
  //           .end()
  //         config
  //           .optimization.splitChunks({
  //             chunks: 'all',
  //             cacheGroups: {
  //               libs: {
  //                 name: 'chunk-libs',
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: 10,
  //                 chunks: 'initial' // only package third parties that are initially dependent
  //               },
  //               elementUI: {
  //                 name: 'chunk-elementUI', // split elementUI into a single package
  //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //               },
  //               commons: {
  //                 name: 'chunk-commons',
  //                 test: resolve('src/components'), // can customize your rules
  //                 minChunks: 3, //  minimum common number
  //                 priority: 5,
  //                 reuseExistingChunk: true
  //               }
  //             }
  //           })
  //         config.optimization.runtimeChunk('single')
  //       }
  //     )
  // }
}
