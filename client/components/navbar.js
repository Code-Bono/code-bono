import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu, Button } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn, isOrg }) => (
  <Menu id="navbar" className="ui grid">
    <div id="left-flex">
      <img
        className="logo left-flex-item"
        src="https://image.flaticon.com/icons/svg/185/185816.svg"
      />
      <Link className="left-flex-item" to="/">
        <h2>Code Bono</h2>
      </Link>
    </div>
    <Menu.Menu className="nav-buttons" position="right">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/proposals">
            <Button>View Open Opportunities</Button>
          </Link>
          <Button onClick={handleClick}>Logout</Button>
          {isOrg ? (
            <Link to="/organization/home">
              <Button>Organization Home</Button>
            </Link>
          ) : (
            <Link to="/profile">
              <Button>User Home</Button>
            </Link>
          )}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/proposals">
            <Button>View Open Opportunities</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </Menu.Menu>
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
