import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class OrganizationPostRequest extends Component {
  handleSubmit(evt) {
    evt.preventDefault()
    console.log(evt.target.requestName.value)
    console.log(evt.target.requestDescription.value)
    console.log(evt.target.deadline.value)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="requestName"
            fluid
            label="Request Name"
            placeholder="Request Name"
          />
          <Form.Input
            name="deadline"
            fluid
            label="Deadline"
            placeholder="Deadline"
          />
        </Form.Group>
        <Form.TextArea
          name="requestDescription"
          label="Description"
          placeholder="Description for the request"
        />
        <Form.Checkbox label="I agree to the Terms and Conditions" />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
