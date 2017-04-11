var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');
module.exports = {
  devtool: 'source-map',
  context: projectRootPath,
  entry: [
    './build/client'
  ],
  oputput: {
    path:assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __SERVER__: false
    }),
    new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
  ],
  module: {
    rules: [
      {
        test:/\.(jpeg|jpg|png|gif)$/,
        [
         {
           loader: 'url-loader',
           options:{
             limit: 10240,
             name: 'img/[hash].[ext]'
           }
         }
       ]
     },
     {
       test:/\.css$/,
       use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:[
            "css-loader",
            {
            loader: 'postcss-loader',
            options: {
              modules:true,
              importLoaders:1,
              localIdentName:'[name]__[local]__[hash:base64:5]',
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }
          ]
        })
      },
      {
        test:/\.scss$/,
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:[
            "css-loader",
            {
            loader: 'postcss-loader', //自动给 css 添加浏览器内核前缀
            options: {
              modules:true,
              importLoaders:2,
              localIdentName:'[name]__[local]__[hash:base64:5]',
              plugins: function () {
                return [
                require('precss'),
                require('autoprefixer')
              ]
            }
          }
          "sass-loader",
          ]
        })
      },
      {
        test:/\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader:'url-loader',
            options:{
              limit: 10000
            }
          }
        ]
      },
      {
        test:/\.(ttf|eot|svg)(\?[\s\S]+)$/,
        use:"file-loader"
      }
    ]
  }
}
