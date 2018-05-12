import React from 'react'
import { connect } from 'react-redux'
import { Navbar, ChatboxNav } from './components'
import { Footer } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ChatboxNav />
      {/*<Footer />*/}
    </div>
  )
}

export default App
