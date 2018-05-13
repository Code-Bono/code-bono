import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
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
        <Header as='h2' icon textAlign='center'>
          <Header.Content >
            <h2 className="project-title">{projectName}</h2>
          </Header.Content>
        </Header>
        <Header as='h4' icon textAlign='center'>
            <h4 className="project-subtitle">Welcome to {projectName}'s collaboration space. <br/>This page will act as home base for you and other developers working on this project. <br/>From here, you can message each other, video chat, manage your project board, and see live updates from your Github repo. <br/> Go ahead, Code Bono!</h4>
          <Vidchat2 />
          <h4><a href={repoURL} target="_blank">Go to Github repo</a></h4>
        </Header>
        <GitHubProjectBoardContainer projectId={projectId}/>
        {/*<GithubFeed />*/}
      </div>
    )
  }
}
