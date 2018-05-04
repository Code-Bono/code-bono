import React, { Component } from 'react'
import Chatbox from './chatbox'
import Vidchat from './vidchat'

export default class Collab extends Component {
  render() {
    return (
      <div>
        <Vidchat />
        <Chatbox />
      </div>
    )
  }
}
