import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Image, Item, Button } from 'semantic-ui-react'

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
      <div>
        <h1>Your Profile!</h1>
        <div className="userContainer">
          {user ? (
            <div>
              <h3>Welcome {user.displayName || user.email}!</h3>
              <Image src={user.imageUrl} />
            </div>
          ) : (
            <h3 className="loading">Loading current user...</h3>
          )}
          <h2>Your current projects</h2>

          {projects.length ? (
            <Item.Group>
              {projects.map(project => {
                return (
                  <Item key={project.id}>
                    <div className="content">
                      <a className="header">{project.name}</a>
                      <div className="description">
                        {project.description.slice(0, 80)}...
                      </div>
                    </div>
                    <div>
                      <Link to={`/projects/${project.id}`}>
                        <Button
                          primary
                          onClick={evt => this.props.loadProject(project.id)}
                        >
                          <Header as="h3">Check in on this project</Header>
                        </Button>
                      </Link>
                    </div>
                  </Item>
                )
              })}
            </Item.Group>
          ) : (
            <div>
              <h3>You currently have no active projects.</h3>
              <Link to={`/proposals`}>
                <Button primary>
                  <Header as="h3">Click here to view all proposals-></Header>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}
