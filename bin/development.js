#!/usr/bin/env node
require('babel-core/register')
var Koa = require('koa')
var app = new Koa()
var middlewareRegister = require('../src/middlewares')
var webpack = require('webpack')
var webpackDevMiddleware = require('koa-webpack-dev-middleware')
var webpackConfig = require('../webpack.development')
var convert = require('koa-convert')
var compiler = webpack(webpackConfig)
var webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

app.use(convert(webpackDevMiddleware(compiler, {
  publicPath: '/static/js',
  stats: {
    colors: true
  }
})))
app.use(convert(function * (next) {
  yield webpackHotMiddleware.bind(null, this.req, this.res)
  yield next
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
