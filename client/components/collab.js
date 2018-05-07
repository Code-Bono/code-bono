import React, { Component } from 'react'
import Vidchat from './vidchat'
import GithubFeed from './GithubFeed'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <GitHubProjectBoardContainer />
        <Vidchat />
        <GithubFeed />
      </div>
    )
  }
}
