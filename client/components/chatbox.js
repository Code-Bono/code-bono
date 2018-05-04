import React, { Component } from 'react'
import socket from '../socket'

//helper function for adding messages to the chatbox
function addToBox(data) {
  let box = document.getElementById('textbox')
  let p = document.createElement('p')
  p.textContent = data
  box.appendChild(p)
}

export default class Chatbox extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUsers()
    this.props.loadMessages()
    socket.on('updateChat', data => {
      addToBox(data)
    })
    //allows enter key to submit message
    window.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.handleClick(this.props.currentUser.email)
      }
    })
  }
  //when message is sent, emits to the socket to broadcast to all with the message and appends that mesasge to our current chatbox div
  handleClick(name) {
    let message = document.getElementById('currentMessage')
    //send message to db
    this.props.postMessage({
      content: message.value,
      userId: this.props.currentUser.id,
      chatroomId: 1
    })
    let data = name + ': ' + message.value
    if (message.value) {
      socket.emit('sendMessage', data)
      message.value = ''
    }
  }
  render() {
    const { currentUser, allMessages } = this.props
    //listens for the emit for updating the chatbox
    return (
      <div>
        <h2>Chatbox here</h2>
        <div id="textbox">
          {allMessages &&
            allMessages.map(message => {
              return (
                <p key={message.id}>
                  {message.user.email + ': ' + message.content}
                </p>
              )
            })}
        </div>
        <div>
          <label htmlFor="sendMessage">Enter Message</label>
          <input id="currentMessage" name="sendMessage" type="text" />
          <button
            onClick={() => this.handleClick(currentUser.email)}
            type="submit"
          >
            Send Message
          </button>
        </div>
      </div>
    )
  }
}
