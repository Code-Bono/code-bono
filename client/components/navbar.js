import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu, Button, Segment } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn, isOrg }) => (
  <Menu id="navbar" className="ui grid">
    <div id="left-flex">
      <img
        className="logo left-flex-item"
        src="https://image.flaticon.com/icons/svg/185/185816.svg"
      />
      <Link className="left-flex-item" to="/">
        <h2 className="home-button">Code Bono</h2>
      </Link>
    </div>
    <Menu.Menu className="nav-buttons-container" position="right">
      {isLoggedIn ? (
        <div>
        <Menu inverted pointing secondary compact>
            {/* The navbar will show these links after you log in */}
            <Menu.Item >
              <Link to="/proposals" className="nav-buttons">
                browse proposals
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about" className="nav-buttons">
                about us
              </Link>
            </Menu.Item>
            {isOrg ? (
            <Menu.Item>
              <Link to="/organization/home" className="nav-buttons">
                organization profile
              </Link>
            </Menu.Item>
            ) : (
            <Menu.Item>
              <Link to="/profile" className="nav-buttons">
                my profile
              </Link>
            </Menu.Item>
            )}
            <Menu.Item>
              <Link to="#" onClick={handleClick} className="nav-buttons">logout</Link>
            </Menu.Item>
          </Menu>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Menu inverted pointing secondary compact>
            <Menu.Item >
              <Link to="/proposals" className="nav-buttons">
                browse proposals
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/about" className="nav-buttons">
                about us
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login" className="nav-buttons">
                login
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup" className="nav-buttons">
                sign Up
              </Link>
            </Menu.Item>
          </Menu>

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
