import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../../client/store/configureStore'
const store = configureStore()

function _match (location) {
  return new Promise((resolve, reject) => {
    match(location, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error)
      }
      resolve({redirectLocation, renderProps})
    })
  })
}
export default async (ctx, next) => {
  try {
    const {redirectLocation, renderProps} = await _match({ routes: require('../../client/routes'), location: ctx.url })
    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      await ctx.render('index', {
        title: 'React',
        dev: ctx.app.env === 'development',
        reduxData: store.getState(),
        app: renderToString(<Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>)
      })
    } else {
      await ctx.render('404')
    }
  } catch (e) {
    ctx.app.env === 'development' && console.log('SERVER ERROR: %s', e.stack)
    await ctx.render('500', {
      msg: ctx.app.env === 'development' ? e.message : false
    })
  }
}
