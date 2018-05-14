import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChatboxContainer from './chatboxContainer'
import { openChat, hideChat } from '../store/chatboxNav'
import { Link } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'

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
      <Container id="ChatboxNavbar">
        {isLoggedIn && (
          <div>
            {chatStatus ? (
              <div>
                <div className="open-nav">
                  <Button
                    fluid
                    size="mini"
                    secondary
                    onClick={this.handleClick}
                  >
                    Hide Chat
                  </Button>
                </div>
                <ChatboxContainer />
              </div>
            ) : (
              <Button id="open-chat" fluid size="mini" onClick={this.handleClick}>
                Open Chat
              </Button>
            )}
          </div>
        )}
      </Container>
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
