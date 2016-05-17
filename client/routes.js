import App from './containers/App'
import Picture from './components/Picture'
import Counter from './containers/Counter'
import { Route } from 'react-router'
import React from 'react'

export default (
<Route path="/" component={App}>
  <Route path="picture" component={Picture} />
  <Route path="counter" component={Counter} />
</Route>
)
