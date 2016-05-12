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
      const renderPage = process.env.NODE_ENV === 'development' ? 'index.dev.ejs' : 'index.ejs'
      await ctx.render(renderPage, {
        title: 'React',
        app: renderToString(<RouterContext {...renderProps} />)
      })
    } else {
      await ctx.render('404')
    }
  } catch (e) {
    await ctx.render('500', {
      msg: process.env.NODE_ENV === 'development' ? e.message : false
    })
  }
}
