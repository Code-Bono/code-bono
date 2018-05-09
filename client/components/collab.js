import React, { Component } from 'react'
import Vidchat2 from './vidchat2'
import GithubFeed from './GithubFeed'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <GitHubProjectBoardContainer />
        <Vidchat2 />
        <GithubFeed />
      </div>
    )
  }
}
