import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import routes from '../routes/react-router/routes'
import './pages/example.less'
ReactDOM.render(
  routes,
  document.querySelector('.react-container')
)
