const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const utils = require('./utils')
const CONFIG = require('../config')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: false,
    hot: true,
    compress: true,

    host: CONFIG.dev.host || 'localhost',
    port: CONFIG.dev.port,

    quiet: true,
    clientLogLevel: 'warning',
    overlay: true
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  },

  optimization: {
    nodeEnv: 'development'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          'Your application is successfully running at: \n\n' +
          `     - local   : http://localhost:${CONFIG.dev.port}\n` +
          `     - network : http://${utils.getIPAddress()}:${CONFIG.dev.port}\n`
        ]
      }
    })
  ]
})
