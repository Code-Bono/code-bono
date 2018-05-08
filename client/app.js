import React from 'react'
import { connect } from 'react-redux'
import { Navbar, ChatboxNav } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ChatboxNav />
    </div>
  )
}

export default App
