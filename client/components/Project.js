import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import GithubFeedContainer from './GithubFeedContainer'
import Vidchat from './vidchat'
import GitHubProjectBoardContainer from './GitHubProjectBoardContainer'
import { Container } from 'semantic-ui-react'
import socket from '../socket'

export default class Project extends Component {
  constructor(props) {
    super(props)
  }

  projectBoardEvent = event => {
    const projectId = this.props.match.params.projectId
    console.log('Event: ', event)
    if (+event.projectId === +projectId) {
      this.props.loadProjectCards(projectId)
    }
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId
    this.props.loadProject(projectId)
    this.props.loadProjectCards(projectId)
    socket.on('projectBoardEvent', this.projectBoardEvent)
  }

  componentWillUnmount() {
    socket.off('projectBoardEvent', this.projectBoardEvent)
  }

  render() {
    const projectName = this.props.project.name
    const projectId = this.props.match.params.projectId
    // const projectId = this.props.project.id ? this.props.project.id : null

    return (
      <div>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container stripe">
            <h2 className="project-header">
              Collaboration Page:
              <span className="header-alt"> {projectName}</span>
            </h2>
            <p className="grey-text">
              This page is home base for you and other developers working on
              this project. <br />You can message each other, video chat, manage
              your project board, and see live updates from your Github repo.
            </p>
            <h3>Go ahead, Code Bono!</h3>
          </div>
        </div>
        <Vidchat user={this.props.user} projectId={projectId} />
        <GithubFeedContainer projectId={projectId} />
        <GitHubProjectBoardContainer projectId={projectId} />
      </div>
    )
  }
}
