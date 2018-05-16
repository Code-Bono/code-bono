import React, { Component } from 'react'
import { Form, Dropdown, Container, Button, Grid } from 'semantic-ui-react'

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
        <Grid.Row>
          <Grid.Column className="form-inputs" width={9}>
            <Form.Input
              required={true}
              type={type}
              name={name}
              fluid
              label={label}
              placeholder={placeholder}
            />
          </Grid.Column>
        </Grid.Row>
      )
    }
    return (
      <Container className="page-name">
        <h1 className="blue-text text-center">Create a Proposal</h1>
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            <Grid className="grid-style">
              {FormInput(
                'proposalName',
                'text',
                'Proposal Name',
                'Proposal Name'
              )}
              <Grid.Row>
                <Grid.Column width={9}>
                  <Form.Input
                    type="text"
                    name="proposalImage"
                    fluid
                    label="Proposal Image"
                    placeholder="Proposal ImageURL"
                  />
                </Grid.Column>
              </Grid.Row>
              {FormInput('proposalDeadline', 'date', 'Deadline', 'Deadline')}
              {causes && (
                <Grid.Row>
                  <Grid.Column width={9}>
                    <Form.Dropdown
                      placeholder="Select Causes"
                      fluid
                      multiple
                      search
                      selection
                      options={options}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              )}
              {/*<Form.Group>*/}
              <Grid.Row>
                <Grid.Column width={9}>
                  <Form.TextArea
                    required={true}
                    name="proposalDescription"
                    label="Description"
                    placeholder="Description for the proposal"
                  />
                </Grid.Column>
              </Grid.Row>
              {/*</Form.Group>*/}
              <Grid.Row className="page-bottom">
                <Grid.Column width={9}>
                  <Form.Button>Submit</Form.Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </div>
      </Container>
    )
  }
}
