import React, { Component } from 'react'
import ChatboxContainer from './chatboxContainer'
import GitHubUpdates from './GitHubUpdates'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <GitHubUpdates />
        <ChatboxContainer />
      </div>
    )
  }
}
