import React, { Component } from 'react'
import Chatbox from './chatbox'
import GitHubUpdates from './GitHubUpdates'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <GitHubUpdates />
        <Chatbox />
      </div>

    )
  }
}
