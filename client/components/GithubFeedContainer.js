import React, { Component } from 'react'
import GithubFeed from './GithubFeed'
import { connect } from 'react-redux'
import { fetchFeed } from '../store/githubFeed'

const mapState = state => {
  return {
    // currentUser: state.user,
    // assignedProjects: state.singleProject,

    feed: state.feed
  }
}

const mapDispatch = dispatch => {
  return {
    loadFeed: () => {
      dispatch(fetchFeed())
    }
  }
}

export default connect(mapState, mapDispatch)(GithubFeed)
