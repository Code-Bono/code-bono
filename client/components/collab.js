import React, { Component } from 'react'
import Vidchat2 from './vidchat2'
import GithubFeed from './GithubFeed'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'
import AddProjectCardContainer from './AddProjectCardContainer'

export default class Collab extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProject('1')
  }

  render() {

    const projectName = this.props.project.name
    const repoURL = this.props.project.id ? this.props.project.repo.URL : null

    return (
      <div>
        <div>
          <h2>{projectName}</h2>
          <h4><a href={repoURL} target="_blank">Go to Github repo</a></h4>
        </div>
        <AddProjectCardContainer />
        <GitHubProjectBoardContainer />
        <Vidchat2 />
        <GithubFeed />
      </div>
    )
  }
}
