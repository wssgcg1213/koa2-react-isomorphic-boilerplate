import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import './pages/example.less'
ReactDOM.render(
  routes,
  document.querySelector('.react-container')
)
