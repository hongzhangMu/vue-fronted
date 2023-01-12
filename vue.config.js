'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('deepmerge')

const ThemeColorReplacer = require('webpack-theme-color-replacer')
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil')
const { resolveCss } = require('./src/utils/theme-color-replacer-extend')

// gizp压缩
// const CompressionPlugin = require('compression-webpack-plugin')
// // gizp压缩的文件后缀
// const productionGzipExtensions = ['html', 'js', 'css', 'svg']

// 打包去掉console.log插件
const TerserPlugin = require('terser-webpack-plugin')

// Three
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_NAME || 'vue Element Admin' // page title

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
    // 跨域处理
    proxy: {
      '/': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        timeout: 3 * 60 * 1000,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/theme.less')]
    },
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'y',
      enableInSFC: true
    }
  },
  configureWebpack: config => {
    // 使用babel-polyfill解决低版本浏览器不兼容问题
    config.entry.app = ['babel-polyfill', 'whatwg-fetch', './src/main.js']
    config.performance = {
      hints: false
    }
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    )
    // Ignore all locale files of moment.js
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (process.env.NODE_ENV === 'development') {
      // 开发环境
      return {
        name: name,
        resolve: {
          alias: {
            '@': resolve('src')
          }
        },
        devtool: 'source-map'
      }
    } else if (process.env.NODE_ENV === 'production') {
      // 生产环境
      return {
        name: name,
        resolve: {
          alias: {
            '@': resolve('src')
          }
        },
        plugins: [
          // gzip压缩配置
          // new CompressionPlugin({
          //   filename: '[path].gz[query]',
          //   // 压缩算法
          //   algorithm: 'gzip',
          //   // 匹配文件
          //   test: new RegExp(
          //     '\\.(' + productionGzipExtensions.join('|') + ')$'
          //   ),
          //   // 压缩超过10k的文件,以字节为单位
          //   threshold: 10240,
          //   // 只有压缩率小于这个值的资源才会被处理
          //   minRatio: 0.8,
          //   // 删除原始文件只保留压缩后的文件
          //   deleteOriginalAssets: true
          // })
        ],
        // 生产环境去除console.log配置
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: false,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
    // i18n配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          loaders: {
            i18n: '@kazupon/vue-i18n-loader'
          }
        })
      )
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  }
}
