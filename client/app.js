import React from 'react'
import { connect } from 'react-redux'
import { Navbar, ChatboxNav } from './components'
import { Footer } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app-container">
      <div className="App Site">
        <div className="Site-content">
          <Navbar />
          <Routes />
          <div className="chatboxnav-container">
            <ChatboxNav />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
