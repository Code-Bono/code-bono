import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class OrganizationPostRequest extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    let request = {}
    request.deadline = evt.target.requestDeadline.value
    request.name = evt.target.requestName.value
    request.description = evt.target.requestDescription.value
    request.isActive = true
    //set up later so we can choose specific organizations to post to
    request.organizationId = 1
    this.props.addRequestToDb(request, this.props.history)
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
            name="requestDeadline"
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
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
