import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore(window.__REDUX_STATE__)
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.querySelector('.react-container')
)
