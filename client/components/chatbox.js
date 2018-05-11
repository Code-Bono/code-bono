import React, { Component } from 'react'
import socket from '../socket'
import { Input, FormButton, Form, Container, Button } from 'semantic-ui-react'

export default class Chatbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChannel: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadUsers()
    this.props.loadProjects(this.props.currentUser.id)
    socket.on('updateChat', data => {
      this.addToBox(data)
    })
  }
  //when message is sent, emits to the socket to broadcast to all with the message and appends that mesasge to our current chatbox div
  handleSubmit(event) {
    event.preventDefault()
    let box = document.getElementById('textbox')
    let { id, email } = this.props.currentUser
    let message = event.target.sendMessage
    //send message to db
    this.props.postMessage(this.state.currentChannel, {
      content: message.value,
      userId: id,
      chatroomId: this.state.currentChannel
    })
    let data = email + ': ' + message.value
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
    let box = document.getElementById('textbox')
    let p = document.createElement('p')
    p.textContent = data
    box.appendChild(p)
    //scrolls to the bottom after message is received
    box.scrollTop = box.scrollHeight
  }
  render() {
    const { currentUser, allMessages, assignedProjects } = this.props
    //listens for the emit for updating the chatbox
    return (
      <Container>
        <Container id="textbox">
          {allMessages &&
            allMessages.map(message => {
              return (
                <p key={message.id}>
                  {message.user.email + ': ' + message.content}
                </p>
              )
            })}
        </Container>
        <Container>
          <h4>Your Channels</h4>
          {assignedProjects.length &&
            assignedProjects.map(project => {
              return (
                <Button
                  name="channel"
                  key={project.id}
                  onClick={this.handleClick}
                  value={project.id}
                >
                  {project.name}
                </Button>
              )
            })}
        </Container>
        <Container textAlign="center">
          <Form onSubmit={this.handleSubmit}>
            <Input
              autoComplete="off"
              name="sendMessage"
              type="text"
              placeholder="Type here"
              focus
            />
            <FormButton inverted color="red" type="submit">
              Send Message
            </FormButton>
          </Form>
        </Container>
      </Container>
    )
  }
}
