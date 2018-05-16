import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, ChatboxNav } from './components'
import { Footer } from './components'
import Routes from './routes'
import Notifications, { notify } from 'react-notify-toast'
class App extends Component {
  constructor(props) {
    super(props)
    this.toastNotification = this.toastNotification.bind(this)
  }

  toastNotification(projectName) {
    let myColor = { background: '#39B7CD', text: '#FFFFFF' }
    notify.show(
      `New Message Received in ${projectName}`,
      'custom',
      3000,
      myColor
    )
  }

  render() {
    return (
      <div>
        <div className="App Site">
          <div className="Site-content">
            <Navbar />
            <Notifications />
            <Routes />
            <div className="chatboxnav-container">
              <ChatboxNav notifyMe={this.toastNotification} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
