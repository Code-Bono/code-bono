import React, { Component } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class EditOrganization extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    let orgObj = {}
    orgObj.id = this.props.currentOrg.id
    orgObj.name = evt.target.orgName.value
    orgObj.description = evt.target.orgDescription.value
    orgObj.address = evt.target.orgAddress.value
    orgObj.phoneNumber = evt.target.orgNumber.value
    orgObj.email = evt.target.orgEmail.value
    orgObj.image = evt.target.orgImage.value
    this.props.editOrg(orgObj)
  }
  render() {
    const { currentOrg } = this.props
    return (
      <Container className="page-name">
        <Link to="/organization/home">
          <Button size="mini">Go Back</Button>
        </Link>
        <h1 className="blue-text text-center">Edit Organization Details</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              required={true}
              name="orgName"
              type="text"
              fluid
              label="Organization Name"
              defaultValue={currentOrg.name}
            />
            <Form.Input
              name="orgImage"
              type="text"
              fluid
              label="Organization ImageURL"
              defaultValue={currentOrg.image}
            />
          </Form.Group>
          <Form.Input
            required={true}
            name="orgAddress"
            width="16"
            type="text"
            fluid
            label="Organization Address"
            defaultValue={currentOrg.address}
          />
          <Form.Group widths="equal">
            <Form.Input
              required={true}
              name="orgNumber"
              type="text"
              fluid
              label="Organization Phone Number"
              defaultValue={currentOrg.phoneNumber}
            />
            <Form.Input
              required={true}
              name="orgEmail"
              type="text"
              fluid
              label="Organization Email"
              defaultValue={currentOrg.email}
            />
          </Form.Group>
          <Form.TextArea
            width={16}
            required={true}
            name="orgDescription"
            type="text"
            label="Organization Description"
            defaultValue={currentOrg.description}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    )
  }
}
