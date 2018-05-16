import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Header,
  Image,
  Item,
  Button,
  Container,
  List,
  Icon
} from 'semantic-ui-react'

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUser(this.props.user.id)
  }

  render() {
    const user = this.props.user
    const projects = user.projects ? user.projects : []
    return (
      <Container>
        <h1 id="user-profile-title">{user.fullname}</h1>
        <div>
          {user ? (
            <div>
              <h3 id="user-profile-email">{user.email}</h3>
              <Image className="profilePicture" src={user.imageUrl} />
              <Link to="/profile/edit">Edit</Link>
            </div>
          ) : (
            <h3 className="loading">Loading current user...</h3>
          )}
          <h2 id="user-profile-projects-header">Your Projects</h2>

          {projects.length ? (
            <Item.Group>
              {projects.map(project => {
                return (
                  <List divided verticalAlign="middle" key={project.id}>
                    <List.Item id="user-profile-project-list">
                      <List.Content floated="right">
                        <Link to={`/projects/${project.id}`}>
                          <Button
                            primary
                            id="user-profile-browse"
                            primary
                            onClick={evt => this.props.loadProject(project.id)}
                          >
                            <Icon name="code" />Check in on this project
                          </Button>
                        </Link>
                      </List.Content>

                      <List.Header>
                        <Icon name="marker" />
                        {project.name}
                      </List.Header>
                      <List.Description>{project.description}</List.Description>
                    </List.Item>
                  </List>
                )
              })}
            </Item.Group>
          ) : (
            <div>
              <h3>You currently have no active projects.</h3>
              <Link to={`/proposals`}>
                <Button primary id="user-profile-browse">
                  <Icon name="search" />Browse proposals
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    )
  }
}
