import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class OrganizationProposal extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    let proposal = {}
    proposal.deadline = evt.target.proposalDeadline.value
    proposal.name = evt.target.proposalName.value
    proposal.description = evt.target.proposalDescription.value
    proposal.isActive = true
    //set up later so we can choose specific organizations to post to
    proposal.organizationId = 1
    this.props.addProposalToDb(proposal, this.props.history)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="proposalName"
            fluid
            label="Proposal Name"
            placeholder="Proposal Name"
          />
          <Form.Input
            name="proposalDeadline"
            fluid
            label="Deadline"
            placeholder="Deadline"
          />
        </Form.Group>
        <Form.TextArea
          name="proposalDescription"
          label="Description"
          placeholder="Description for the proposal"
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
