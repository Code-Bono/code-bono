import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChatboxContainer from './chatboxContainer'
import { openChat, hideChat } from '../store/chatboxNav'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class ChatboxNavbar extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  //function to toggle chatbox
  handleClick() {
    const { hide, open, isLoggedIn, chatStatus } = this.props
    if (!chatStatus) {
      open()
    } else {
      hide()
    }
  }
  render() {
    const { isLoggedIn, chatStatus } = this.props
    return (
      <nav>
        {isLoggedIn ? (
          <div>
            {chatStatus ? (
              <div>
                <ChatboxContainer />
                <Button secondary onClick={this.handleClick}>
                  Hide Chat
                </Button>
              </div>
            ) : (
              <Button primary onClick={this.handleClick}>
                Open Chat
              </Button>
            )}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <h4>Login to see chat</h4>
          </div>
        )}
      </nav>
    )
  }
}

const mapState = state => {
  return {
    chatStatus: state.chatStatus,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    hide: () => {
      dispatch(hideChat())
    },
    open: () => {
      dispatch(openChat())
    }
  }
}

export default connect(mapState, mapDispatch)(ChatboxNavbar)

ChatboxNavbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
