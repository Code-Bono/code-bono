import React, { Component } from 'react'
import Vidchat from './vidchat'
import ChatboxContainer from './chatboxContainer'
import GitHubUpdates from './GitHubUpdates'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <Vidchat />
        <GitHubUpdates />
        <ChatboxContainer />
      </div>
    )
  }
}
