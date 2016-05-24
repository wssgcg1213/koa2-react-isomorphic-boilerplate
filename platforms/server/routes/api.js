import Router from 'koa-router'
import state from '../controllers/stateCtrl'
const router = new Router()
router.prefix('/api')

router.get('/state', state)

export default router
