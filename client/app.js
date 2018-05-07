import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Navbar, ChatboxNav } from './components'
import Routes from './routes'

const App = ({ isLoggedIn }) => {
  return (
    <div>
      <Navbar />
      <Routes />
      {isLoggedIn && <ChatboxNav />}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(App)

/**
 * PROP TYPES
 */
App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
