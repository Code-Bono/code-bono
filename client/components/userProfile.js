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

          <div>
            <Link to="/collab">
              <h3>Take me to my collaboration eden!!</h3>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
