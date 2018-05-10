import React, { Component } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'

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
    console.log(orgObj)
  }
  render() {
    const { currentOrg } = this.props
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="orgName"
              type="text"
              fluid
              label="Organization Name"
              defaultValue={currentOrg.name}
            />
            <Form.Input
              name="orgDescription"
              type="text"
              fluid
              label="Organization Description"
              defaultValue={currentOrg.description}
            />
            <Form.Input
              name="orgImage"
              type="text"
              fluid
              label="Organization ImageURL"
              defaultValue={currentOrg.image}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              name="orgNumber"
              type="text"
              fluid
              label="Organization Phone Number"
              defaultValue={currentOrg.phoneNumber}
            />
            <Form.Input
              name="orgEmail"
              type="text"
              fluid
              label="Organization Email"
              defaultValue={currentOrg.email}
            />
          </Form.Group>
          <Form.Input
            name="orgAddress"
            type="text"
            fluid
            label="Organization Address"
            defaultValue={currentOrg.address}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    )
  }
}
