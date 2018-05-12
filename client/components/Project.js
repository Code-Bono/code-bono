import React, { Component } from 'react'
import Vidchat2 from './vidchat2'
import GithubFeed from './GithubFeed'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'

export default class Project extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId
    this.props.loadProject(projectId)
    this.props.loadProjectCards(projectId)
    // this.interval = setInterval(this.props.loadProjectCards(projectId), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const projectName = this.props.project.name
    const repoURL = this.props.project.id ? this.props.project.repo.URL : null
    const projectId = this.props.project.id ? this.props.project.id : null

    return (
      <div>
        <div>
          <h2>{projectName}</h2>
          <h4>
            <a href={repoURL} target="_blank">
              Go to Github repo
            </a>
          </h4>
        </div>
        <Vidchat2 />
        <GitHubProjectBoardContainer projectId={projectId} />
        {/* <GithubFeed /> */}
      </div>
    )
  }
}
