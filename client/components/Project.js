import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import GithubFeedContainer from './GithubFeedContainer'
import Vidchat from './vidchat'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'
import { Container } from 'semantic-ui-react'

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
    const projectId = this.props.match.params.projectId
    // const projectId = this.props.project.id ? this.props.project.id : null

    return (
      <div>
        <div className="projectBoard-headers-container">
          <Header as="h1" icon textAlign="center">
            <Header.Content>
              <h1 className="project-title">{projectName}</h1>
            </Header.Content>
          </Header>
          <Header as="h3" icon textAlign="center">
            <Header.Content>
              <h3 className="project-subtitle">
                Welcome to {projectName}'s collaboration space. <br />This page
                will act as home base for you and other developers working on
                this project. <br />From here, you can message each other, video
                chat, manage your project board, <br />and see live updates from
                your Github repo. <br /> Go ahead, Code Bono!
              </h3>
            </Header.Content>
          </Header>
        </div>
        <Vidchat user={this.props.user} projectId={projectId} />
        <GitHubProjectBoardContainer projectId={projectId} />
        <GithubFeedContainer projectId={projectId} />
      </div>
    )
  }
}
