var webpack = require('webpack')
var path = require('path')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [{
  name: 'backend dev hot middlware',
  entry: ['webpack-hot-middleware/client', './src/views/index.js'],
  output: {
    path: path.join(__dirname, '/public/static/build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.js', '.jsx']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader', 'less-loader')
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
        { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' },
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
    new ExtractTextPlugin('all.min.css'),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}]

