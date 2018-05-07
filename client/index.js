import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import { Container } from 'semantic-ui-react'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Container>
        <App />
      </Container>
    </Router>
  </Provider>,
  document.getElementById('app')
)
