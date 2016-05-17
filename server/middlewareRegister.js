import path from 'path'
import views from 'koa-views'
import json from 'koa-json'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import convert from 'koa-convert'
import Bodyparser from 'koa-bodyparser'
import config from '../config'
const bodyparser = Bodyparser()
const templatePath = path.join(__dirname, './templates')

export default (app) => {
  // reg middlewares
  app.use(convert(bodyparser))
  app.use(convert(json()))
  app.use(convert(logger()))

  // static serve
  app.use(convert(koaStatic(config.rootPath + config.publicPath)))

  // template ejs
  app.use(views(templatePath, { extension: 'ejs' }))

  app.use(async (ctx, next) => {
    // api server through koa-router
    if (ctx.path.match(/^\/api/)) {
      return await require('./routes/koa-routes').routes()(ctx, next)
    }
    // others react-router
    await require('./routes/react-routes')(ctx, next)
  })

  // 500 error
  koaOnError(app, { template: templatePath + '/500.ejs' })

  // logger
  if (app.env === 'development') {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  }

  // 404
  app.use(async (ctx) => {
    ctx.status = 404
    await ctx.render('404')
  })
}
