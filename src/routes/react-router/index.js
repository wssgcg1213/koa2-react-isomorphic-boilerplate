import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'

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
    const {redirectLocation, renderProps} = await _match({ routes, location: ctx.url })
    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      await ctx.render('index', {
        title: 'React',
        app: renderToString(<RouterContext {...renderProps} />)
      })
    } else {
      await ctx.throw(404, 'Not found')
    }
  } catch (e) {
    await ctx.throw(500, e.message)
  }
}
