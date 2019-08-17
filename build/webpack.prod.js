process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const commonConfig = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  optimization: {
    nodeEnv: 'production',

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      }),

      new OptimizeCSSAssetsPlugin()
    ],

    // 分割chunk
    splitChunks: {
      chunks: 'async',
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 分割出第三方库
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          filename: utils.assetsPath('js/[name].[contenthash].js'),
          chunks: 'all'
        }
      }
    },

    runtimeChunk: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)
    }),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    })
  ]
})
