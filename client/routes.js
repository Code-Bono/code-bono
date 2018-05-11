import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllProposalsContainer,
  Collab,
  EditOrganizationContainer,
  EditProposalsContainer,
  LandingPage,
  LandingPageContainer,
  Login,
  OrganizationHomeContainer,
  OrganizationProposalContainer,
  ProjectContainer,
  SingleProposalContainer,
  Signup,
  UserHome,
  UserProfileContainer,
  ViewOrganizationProposalsContainer
} from './components'
import { me } from './store'
import EditOrganization from './components/EditOrganization'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPageContainer} />
        <Route exact path="/proposals" component={AllProposalsContainer} />
        <Route
          exact
          path="/proposals/:proposalId"
          component={SingleProposalContainer}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/organization/make-proposal"
          component={OrganizationProposalContainer}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/profile" component={UserProfileContainer} />
            <Route
              path="/organization/home"
              component={OrganizationHomeContainer}
            />
            <Route exact path="/projects" component={ProjectContainer} />
            <Route
              exact
              path="/projects/:projectId"
              component={ProjectContainer}
            />
            <Route
              path="/organization/edit"
              component={EditOrganizationContainer}
            />
            <Route
              exact
              path="/organization/proposals"
              component={ViewOrganizationProposalsContainer}
            />
            <Route
              exact
              path="/organization/proposals/:id/edit"
              component={EditProposalsContainer}
            />
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
