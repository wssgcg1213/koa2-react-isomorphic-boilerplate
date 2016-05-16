#!/usr/bin/env node
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif'],
  name: '/static/build/[name].[ext]',
  limit: 10000
})
require('babel-polyfill')
require('babel-core/register')({
  plugins: [
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.less', '.css']
    }]
  ]
})

var Koa = require('koa')
var app = new Koa()
var path = require('path')
var middlewareRegister = require('../src/middlewares')
var webpack = require('webpack')
var KWM = require('koa-webpack-middleware')
var devMiddleware = KWM.devMiddleware
var hotMiddleware = KWM.hotMiddleware
var chokidar = require('chokidar')
var webpackConfig = require('../webpack.development')
var convert = require('koa-convert')
var compiler = webpack(webpackConfig)
app.env = 'development'
var devMiddlewareInstance = devMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: '/static/build/',
  stats: {
    colors: true
  }
})
var hotMiddlewareInstance = hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
})
app.use(devMiddlewareInstance)
app.use(hotMiddlewareInstance)

middlewareRegister(app) // reg middleware
// error logger
app.on('error', function (err, ctx) {
  console.log('error occured:', err.stack)
})
var http = require('http')
var config = require('../src/config')
var server = http.createServer(app.callback())
var isListened = false
console.log('Waiting for building ...')
var watcher = chokidar.watch(path.join(__dirname, '../src'))
watcher.on('ready', function () {
  watcher.on('all', function () {
    console.log("Clearing /src/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id];
    });
  })
})
compiler._plugins['after-compile'].push(function (compilation, callback) {
  callback()
  !isListened && server.listen(config.port, function () {
    console.log('App started, at port %d, CTRL + C to terminate', config.port)
    isListened = true
  })
})
