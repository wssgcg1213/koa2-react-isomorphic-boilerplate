import path from 'path'
import views from 'koa-views'
import json from 'koa-json'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import convert from 'koa-convert'
import mount from 'koa-mount'
import koaRouter from 'koa-router'
import Bodyparser from 'koa-bodyparser'
import reactRoutes from '../routes/react-router'
import routes from '../routes/koa-router'

const bodyparser = Bodyparser()
const router = koaRouter()

export default (app) => {
  // reg middlewares
  app.use(convert(bodyparser))
  app.use(convert(json()))
  app.use(convert(logger()))
  // static
  app.use(convert(koaStatic(path.join(__dirname, '../../public'), {
    pathPrefix: ''
  })))

  // views
  app.use(views(path.join(__dirname, '../../views'), {
    extension: 'ejs'
  }))

  // reg routes
  router.use('/api', routes.routes(), routes.allowedMethods)
  app.use(router.routes(), router.allowedMethods())
  app.use(reactRoutes)

  // 500 error
  koaOnError(app, {
    template: 'views/500.ejs'
  })

  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // 404
  app.use(async (ctx) => {
    ctx.status = 404
    await ctx.render('404')
  })
}
