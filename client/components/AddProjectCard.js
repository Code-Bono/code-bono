import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class AddProjectCard extends Component {
  render() {
    return (
      <Form>
        <Form.TextArea label='note' placeholder='Tell us more about you...' />
      </Form>
    )
  }
}
