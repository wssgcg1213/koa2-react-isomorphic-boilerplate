var webpack = require('webpack')
var path = require('path')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  name: 'backend dev hot middlware',
  entry: [
    // For old browsers
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/views/index.js'
  ],
  output: {
    path: path.join(__dirname, '/public/static/build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/build/'
  },

  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '/node_modules')],
    extensions: ['', '.js', '.jsx']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules', path.join(__dirname, '/node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          'env': {
            'development': {
              'presets': ['react-hmre']
            }
          }
        }
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style!css!postcss' // ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style!css!postcss!less' // ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader', 'less-loader')
      },
      { test: /\.woff2?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg|jpeg|gif)$/i, loader: 'url?limit=10000&name=[name].[ext]' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html?$/, loader: 'file?name=[name].[ext]' }
    ]
  },

  postcss: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
    })
  ],
  plugins: [
    // new ExtractTextPlugin('all.min.css'),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}

