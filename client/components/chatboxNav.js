import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChatboxContainer from './chatboxContainer'
import { openChat, hideChat } from '../store/chatboxNav'
import { Link } from 'react-router-dom'
import { fetchToastProject } from '../store/fetchProjectForToast'
import { Button, Container } from 'semantic-ui-react'

class ChatboxNavbar extends Component {
  constructor(props) {
    super(props)
    this.handleNotification = this.handleNotification.bind(this)
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

  handleNotification(projectId) {
    //updates the current toast projectId for notification and grabs the project name to pass it up to the parent to display in the toast notification
    this.props.updateToastProject(projectId).then(() => {
      this.props.notifyMe(this.props.toastProject.name)
    })
  }

  render() {
    const { isLoggedIn, chatStatus } = this.props
    return (
      <Container id="ChatboxNavbarClosed">
        {isLoggedIn && (
          <Container>
            {chatStatus ? (
              <Container id="ChatboxNavbar">
                <Container className="open-nav">
                  <Button
                    fluid
                    size="mini"
                    secondary
                    onClick={this.handleClick}
                  >
                    Hide Chat
                  </Button>
                </Container>
                <ChatboxContainer notification={this.handleNotification} />
              </Container>
            ) : (
              <Button
                id="open-chat"
                fluid
                size="mini"
                onClick={this.handleClick}
              >
                Open Chat
              </Button>
            )}
          </Container>
        )}
      </Container>
    )
  }
}

const mapState = state => {
  return {
    chatStatus: state.chatStatus,
    isLoggedIn: !!state.user.id,
    toastProject: state.toastProject
  }
}

const mapDispatch = dispatch => {
  return {
    hide: () => {
      dispatch(hideChat())
    },
    open: () => {
      dispatch(openChat())
    },
    updateToastProject: id => {
      return dispatch(fetchToastProject(id))
    }
  }
}

export default connect(mapState, mapDispatch)(ChatboxNavbar)

ChatboxNavbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
