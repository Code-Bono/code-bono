import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu, Button } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn, isOrg }) => (
  <Menu className="ui grid">
    <Link to="/" className="eight wide column">
      <h1>Code Bono</h1>
    </Link>
    <nav className="eight wide column">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Button onClick={handleClick}>Logout</Button>
          {isOrg ? (
            <Link to="/organization/home">
              <Button>Organization Home</Button>
            </Link>
          ) : (
            <Link to="/home">
              <Button>User Home</Button>
            </Link>
          )}
          <Link to="/proposals">
            <Button>View Proposals</Button>
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/proposals">
            <Button>View Proposals</Button>
          </Link>
        </div>
      )}
    </nav>
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isOrg: !!state.user.orgId
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
