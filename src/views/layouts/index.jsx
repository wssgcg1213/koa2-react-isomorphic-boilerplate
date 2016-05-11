import React, { Component } from 'react'
import { Link } from 'react-router'

class Layout extends Component {
  render () {
    return (
      <div>
        <h2>React SSR Boilerplate</h2>
        <Link to='/'>Home </Link>
        <Link to='/example'>Example link</Link>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
