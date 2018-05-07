import React, { Component } from 'react'
import socket from '../socket'
import { Input, FormButton, Form, Container } from 'semantic-ui-react'

export default class Chatbox extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadUsers()
    this.props.loadMessages()
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
    this.props.postMessage({
      content: message.value,
      userId: id,
      chatroomId: 1
    })
    let data = email + ': ' + message.value
    if (message.value) {
      socket.emit('sendMessage', data)
      message.value = ''
      box.scrollTop = box.scrollHeight
    }
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
    const { currentUser, allMessages } = this.props
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
