var Koa = require('koa')
var app = new Koa()
var middlewareRegister = require('./middlewares')
middlewareRegister(app) // reg middleware

var http = require('http')
var config = require('./config')
var server = http.createServer(app.callback())
server.listen(config.port, function () {
  console.log('App started, at port %d, CTRL + C to terminate', config.port)
})
