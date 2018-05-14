import React, { Component } from 'react'
import { Container, Header, Form, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class EditProposals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      causes: [],
      active: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleActivity = this.handleActivity.bind(this)
  }
  componentDidMount() {
    this.props.getProposal(this.props.proposalId)
    this.props.loadCauses()
  }

  handleChange(e, { value }) {
    this.setState({ causes: value })
  }

  handleActivity(e, { value }) {
    this.setState({ active: value })
  }

  handleSubmit(evt) {
    console.log(evt.target.proposalIsActive)
    evt.preventDefault()
    let proposalObj = {}
    proposalObj.name = evt.target.proposalName.value
    proposalObj.description = evt.target.proposalDescription.value
    proposalObj.image = evt.target.proposalImage.value
    proposalObj.deadline = evt.target.proposalDeadline.value
    proposalObj.isActive = this.state.active
    proposalObj.organizationId = this.props.currentOrg.id
    proposalObj.causes = this.state.causes
    this.props.editProposal(this.props.proposalId, proposalObj)
    console.log(proposalObj)
  }

  render() {
    let { proposal } = this.props
    const { causes } = this.props
    const options = causes.map(cause => {
      const obj = {}
      obj.text = cause.name
      obj.value = cause.id
      return obj
    })
    return (
      <Container>
        {proposal.name ? (
          <div>
            <h1>Edit Proposal</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  required={true}
                  name="proposalName"
                  type="text"
                  fluid
                  label="Proposal Name"
                  defaultValue={proposal.name}
                />
                <Form.Input
                  name="proposalImage"
                  type="text"
                  fluid
                  label="Proposal Image"
                  defaultValue={proposal.image}
                />
                <Form.Input
                  required={true}
                  type="date"
                  name="proposalDeadline"
                  fluid
                  label="Deadline"
                  defaultValue={proposal.deadline}
                />
                <Dropdown
                  selection
                  onChange={this.handleActivity}
                  options={[
                    { value: true, text: 'true' },
                    { value: false, text: 'false' }
                  ]}
                  required={true}
                  type="text"
                  name="proposalIsActive"
                  fluid
                  placeholder="true or false?"
                />
              </Form.Group>
              <Form.Group>
                <Form.TextArea
                  required={true}
                  width="16"
                  type="text"
                  name="proposalDescription"
                  label="Description"
                  defaultValue={proposal.description}
                />
              </Form.Group>
              {causes && (
                <Dropdown
                  placeholder="Select Causes"
                  fluid
                  multiple
                  search
                  selection
                  options={options}
                  onChange={this.handleChange}
                />
              )}
              <Form.Button>Submit</Form.Button>
            </Form>
          </div>
        ) : (
          <h1>There is no proposal here</h1>
        )}
      </Container>
    )
  }
}
