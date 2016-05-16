import React, { Component } from 'react'
import Layout from './layouts'

export default class extends Component {
  render () {
    return (<Layout>
      <h1>HELLO WORLD Ling!</h1>

      {this.props.children}
    </Layout>)
  }
}
