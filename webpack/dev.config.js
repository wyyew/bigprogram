var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

var projectRootPath = path.resolve(__dirname,'../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

var config = require('../src/config');

module.exports = {
  devtool: 'cheap-eval-surce-map',
  context:projectRootPath,
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    './src/client'
  ],
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + config.host + ':' + (config.port + 1) + '/dist'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __SERVER__: false
    }),
    new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')).development()
  ],
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:"babel-loader"
      },
      {
        test: /\.(scss|css)$/,
        use: [
        'style-loader',
        'css-loader',
        {
          loader:'postcss-loader',
            options: {
              plugins: [
                require('postcss-loader'),
                require('autoprefixer')
              ]
            }
        },
        'sass-loader'
        ]
      },
      {
        test: /\.(?:jpg|gif|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 10240,
              name: 'img/[hash].[ext]'
            }
          },
          'image-webpack-loader'
        ]
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
      }
    ]
  }
}
