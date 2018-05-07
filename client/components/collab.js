import React, { Component } from 'react'
import Vidchat from './vidchat'
import ChatboxContainer from './chatboxContainer'
import GithubUpdates from './GithubUpdates'
import GithubFeed from './GithubFeed'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <Vidchat />
        <ChatboxContainer />
        <GithubUpdates />
        <GithubFeed />
      </div>
    )
  }
}
