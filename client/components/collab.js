import React, { Component } from 'react'
import Vidchat2 from './vidchat2'
import GithubFeed from './GithubFeed'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'
import AddProjectCardContainer from './AddProjectCardContainer'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <AddProjectCardContainer />
        <GitHubProjectBoardContainer />
        <Vidchat2 />
        <GithubFeed />
      </div>
    )
  }
}
