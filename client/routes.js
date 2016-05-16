import App from './App'
import PageExapmle from './pages/example'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import React from 'react'

export default (
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="example" component={PageExapmle}>
      <Redirect from="example-redirect" to="/example" />
    </Route>
  </Route>
</Router>
)
