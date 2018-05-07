import React, { Component } from 'react'
import Vidchat from './vidchat'
import ChatboxContainer from './chatboxContainer'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <GitHubProjectBoardContainer />
        <Vidchat />
        <ChatboxContainer />
      </div>
    )
  }
}
