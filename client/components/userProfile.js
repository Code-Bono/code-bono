import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Card } from 'semantic-ui-react'

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUser(this.props.user.id)
  }
  // componentWillUnmount() {}

  render() {
    const user = this.props.user
    const projects = user.projects ? user.projects : []
    console.log(user)
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

          {projects.length && (
            <Card.Group itemsPerRow={3}>
              {projects.map(project => {
                return (
                  <Card key={project.id} className="ui card">
                    <div className="image">
                      <img src={project.image} />
                    </div>
                    <div className="content">
                      <a className="header">{project.name}</a>
                      <div className="meta">
                        <span className="date">
                          Deadline: {project.deadline}
                        </span>
                      </div>
                      <div className="description">{project.description}</div>
                    </div>
                    <div className="extra content">
                      {/* <button
                        className="ui button"
                        onClick={evt => handleClick(evt, project.id)}
                      > */}
                        <Link to={`/projects/${project.id}`}>More info</Link>
                      {/* </button> */}
                    </div>
                  </Card>
                )
              })}
            </Card.Group>
          )}
        </div>
      </div>
    )
  }
}
