#!/usr/bin/env node
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
var middlewareRegister = require('../src/middlewares')
var webpack = require('webpack')
var KWM = require('koa-webpack-middleware')
var devMiddleware = KWM.devMiddleware
var hotMiddleware = KWM.hotMiddleware
var webpackConfig = require('../webpack.development')
var convert = require('koa-convert')
var compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler, {
  noInfo: true,
  quiet: true,
  publicPath: '/static/build/',
  stats: {
    colors: true
  }
}))
app.use(hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

middlewareRegister(app) // reg middleware
// error logger
app.on('error', function (err, ctx) {
  console.log('error occured:', err.stack)
})
var http = require('http')
var config = require('../src/config')
var server = http.createServer(app.callback())
server.listen(config.port, function () {
  console.log('App started, at port %d, CTRL + C to terminate', config.port)
})
