import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

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

          {user.projects &&
            user.projects.length && (
              <Card.Group itemsPerRow={3}>
                {proposals.map(proposal => {
                  return (
                    <Card key={proposal.id} className="ui card">
                      <div className="image">
                        <img src={proposal.image} />
                      </div>
                      <div className="content">
                        <a className="header">{proposal.name}</a>
                        <div className="meta">
                          <span className="date">
                            Deadline: {proposal.deadline}
                          </span>
                        </div>
                        <div className="description">
                          {proposal.description}
                        </div>
                      </div>
                      <div className="extra content">
                        <button
                          className="ui button"
                          onClick={evt => handleClick(evt, proposal.id)}
                        >
                          <Link to={`/proposals/${proposal.id}`}>
                            More info
                          </Link>
                        </button>
                        <ProjectSignupButton
                          proposalId={proposal.id}
                          proposalName={proposal.name}
                          proposalDescription={proposal.description}
                        />
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
