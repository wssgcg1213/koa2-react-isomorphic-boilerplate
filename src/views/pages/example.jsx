import React, { Component } from 'react'
import ExampleComponent from '../components/ExampleComponent'
import './example.less'

export default class extends Component {

  render () {
    return (<div>
      <h1 className="example">EXAPMLE PAGE</h1>
      <ExampleComponent />
    </div>)
  }
}
