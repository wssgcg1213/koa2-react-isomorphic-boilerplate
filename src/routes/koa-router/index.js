import Router from 'koa-router'
const router = new Router()
router.get('/', async (ctx, next) => {
  ctx.body = {
    status: 200,
    info: 'It is a json api demo'
  }
})

export default router
