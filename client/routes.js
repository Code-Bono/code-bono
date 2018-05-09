import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllProposalsContainer,
  Login,
  Signup,
  SingleProposal,
  UserHome,
  Collab,
  LandingPage,
  Home,
  OrganizationProposalContainer,
<<<<<<< HEAD
  UserProfileContainer
=======
  OrganizationHomeContainer
>>>>>>> master
} from './components'
import { me } from './store'
import { fetchRepos } from './store/githubRepos'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    // this.props.loadRepos()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/proposals" component={AllProposalsContainer} />
        <Route exact path="/proposals/:proposalId" component={SingleProposal} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/orgs/proposal"
          component={OrganizationProposalContainer}
        />
        {/* Temporary route to a landing page for MPV */}
        <Route exact path="/home" component={Home} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
<<<<<<< HEAD
            <Route path="/profile" component={UserProfileContainer} />
=======
            <Route path="/home" component={UserHome} />
            <Route
              path="/organization/home"
              component={OrganizationHomeContainer}
            />
>>>>>>> master
            <Route exact path="/collab" component={Collab} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadRepos() {
      dispatch(fetchRepos('Code-Bono-Projects'))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
