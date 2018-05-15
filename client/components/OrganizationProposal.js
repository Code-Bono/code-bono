import React, { Component } from 'react'
import { Form, Dropdown, Container, Button } from 'semantic-ui-react'

export default class OrganizationProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      causes: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.loadCauses()
  }

  handleChange(e, { value }) {
    this.setState({ causes: value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let proposal = {}
    proposal.deadline = evt.target.proposalDeadline.value
    proposal.name = evt.target.proposalName.value
    proposal.description = evt.target.proposalDescription.value
    proposal.isActive = true
    proposal.organizationId = this.props.currentOrg.id
    proposal.causes = this.state.causes
    this.props.addProposalToDb(proposal, this.props.history)
  }
  render() {
    const { causes } = this.props
    //maps over causes array and changes the key names so we can use it in the Semantic UI Dropdown
    const options = causes.map(cause => {
      const obj = {}
      obj.text = cause.name
      obj.value = cause.id
      return obj
    })
    const FormInput = (name, type, label, placeholder) => {
      return (
        <Form.Input
          required={true}
          width={9}
          type={type}
          name={name}
          fluid
          label={label}
          placeholder={placeholder}
        />
      )
    }
    return (
      <Container>
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            {FormInput(
              'proposalName',
              'text',
              'Proposal Name',
              'Proposal Name'
            )}
            <Form.Input
              width={9}
              type="text"
              name="proposalImage"
              fluid
              label="Proposal Image"
              placeholder="Proposal ImageURL"
            />
            {FormInput('proposalDeadline', 'date', 'Deadline', 'Deadline')}
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
            <Form.Group>
              <Form.TextArea
                required={true}
                width="16"
                name="proposalDescription"
                label="Description"
                placeholder="Description for the proposal"
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </div>
      </Container>
    )
  }
}
