import React, { Component } from 'react'
import axios from 'axios'

export default class GitHubUpdates extends Component {

  componentDidMount () {
    axios.get('https://api.github.com/user/orgs?access_token=')
    .then(data => console.log('DATA!!!', data))
    .catch(err => console.log(err))
  }

  render () {
    return (
      <h1>Github updates</h1>
    )
  }
}
