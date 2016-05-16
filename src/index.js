import Koa from 'koa'
import middlewares from './middlewares'

const app = new Koa()
middlewares(app) // reg middleware

import http from 'http'
import config from './config'
const server = http.createServer(app.callback())
server.listen(config.port, () => {
  console.log('App started, bind port %d, CTRL + C to terminate', config.port)
})
