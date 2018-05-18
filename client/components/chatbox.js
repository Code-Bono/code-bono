import React, { Component } from 'react'
import socket from '../socket'
import { Input, FormButton, Form, Container, Button } from 'semantic-ui-react'

export default class Chatbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChannel: 0,
      notification: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  receiveMessage = data => {
    //checks if the message you received is for the right channel before appending it
    if (data.channelId === this.state.currentChannel) {
      this.addToBox(data.message)
    } else if (
      //checks if user is assigned to the project before emitting the notification
      this.props.assignedProjects.length &&
      this.props.assignedProjects.find(project => project.id === data.channelId)
    ) {
      this.props.notification(data.channelId)
    }
  }
  componentDidMount() {
    //sets channel to nothing to show no messages when re-opened
    this.setState({ currentChannel: 0 }, () =>
      this.props.loadMessages(this.state.currentChannel)
    )
    this.props.loadUsers()
    this.props.loadProjects(this.props.currentUser.id)
    socket.on('updateChat', this.receiveMessage)
  }

  componentWillUnmount() {
    socket.off('updateChat', this.receiveMessage)
  }

  //when message is sent, emits to the socket to broadcast to all with the message and appends that mesasge to our current chatbox div
  handleSubmit(event) {
    event.preventDefault()
    let box = document.getElementById('inside-box')
    let { id, email } = this.props.currentUser
    let message = event.target.sendMessage
    //send message to db
    this.props.postMessage(this.state.currentChannel, {
      content: message.value,
      userId: id,
      chatroomId: this.state.currentChannel
    })
    let data = {}
    data.message = email + ': ' + message.value
    data.channelId = this.state.currentChannel
    if (message.value) {
      socket.emit('sendMessage', data)
      message.value = ''
      box.scrollTop = box.scrollHeight
    }
  }

  handleClick(evt) {
    this.setState({ currentChannel: +evt.target.value }, () =>
      this.props.loadMessages(this.state.currentChannel)
    )
  }
  //helper function for adding messages to the chatbox
  addToBox(data) {
    let box = document.getElementById('inside-box')
    if (box) {
      let p = document.createElement('p')
      p.textContent = data
      box.appendChild(p)
      //scrolls to the bottom after message is received
      box.scrollTop = box.scrollHeight
    }
  }
  render() {
    const { currentUser, allMessages, assignedProjects } = this.props
    //listens for the emit for updating the chatbox
    return (
      <Container id="chatbox">
        <Container id="textbox">
          <div id="inside-box">
            {allMessages &&
              allMessages.map(message => {
                return (
                  <div className="message-border" key={message.id}>
                    {message.user.email + ': '}
                    <p className="message">{message.content}</p>
                  </div>
                )
              })}
          </div>
          <Container textAlign="center" id="message-form">
            <Form onSubmit={this.handleSubmit}>
              <Input
                size="mini"
                autoComplete="off"
                name="sendMessage"
                type="text"
                placeholder="Type here"
                focus
              />
              <FormButton size="mini" inverted color="green" type="submit">
                Send
              </FormButton>
            </Form>
          </Container>
        </Container>
        <Container id="channel-box">
          <Container className="channel-list-head" textAlign="center">
            <h4>Channel List</h4>
          </Container>
          <div id="inside-channel">
            <Button.Group vertical>
              {assignedProjects.length &&
                assignedProjects.map(project => {
                  return (
                    <Button
                      toggle
                      inverted
                      color="blue"
                      size="mini"
                      name="channel"
                      key={project.id}
                      onClick={this.handleClick}
                      value={project.id}
                    >
                      {project.name}
                    </Button>
                  )
                })}
            </Button.Group>
          </div>
        </Container>
      </Container>
    )
  }
}
