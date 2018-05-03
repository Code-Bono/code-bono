import React, { Component } from 'react'
import socket from '../socket'

export default class Chatbox extends Component {
  constructor(props) {
    super(props)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    let data = evt.target.sendMessage.value
    let box = document.getElementById('textbox')
    socket.emit('sendMessage', data)
    let p = document.createElement('p')
    p.textContent = data
    box.appendChild(p)
  }
  render() {
    socket.on('updateChat', data => {
      let box = document.getElementById('textbox')
      let p = document.createElement('p')
      p.textContent = data
      box.appendChild(p)
    })
    return (
      <div>
        <div id="textbox" />
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="sendMessage">Enter Message</label>
            <input name="sendMessage" type="text" />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    )
  }
}
