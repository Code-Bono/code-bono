import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { createOrg } from '../store/organization'
import { Form, Button, Container, Icon } from 'semantic-ui-react'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOrg: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  //when checkbox is toggled, changes state which then renders out extra fields or hides them
  handleChange() {
    this.setState({ isOrg: !this.state.isOrg })
  }

  render() {
    //didn't modularize organization sign up because it would be annoying to pass up form values
    const { name, displayName, handleSubmit, error } = this.props
    return (
      <div>
        <Form onSubmit={handleSubmit} name={name}>
          <Form.Group widths="equal">
            <Form.Input name="email" type="text" fluid label="Email" />
            <Form.Input name="password" type="text" fluid label="Password" />
            {displayName === 'Sign Up' && (
              <Form.Checkbox
                onChange={this.handleChange}
                label="I am a representative for an organization"
              />
            )}
          </Form.Group>
          {this.state.isOrg && (
            <Container>
              <Form.Group widths="equal">
                <Form.Input
                  name="orgName"
                  type="text"
                  fluid
                  label="Organization Name"
                />
                <Form.Input
                  name="orgDescription"
                  type="text"
                  fluid
                  label="Organization Description"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  name="orgNumber"
                  type="text"
                  fluid
                  label="Organization Phone Number"
                />
                <Form.Input
                  name="orgEmail"
                  type="text"
                  fluid
                  label="Organization Email"
                />
              </Form.Group>
              <Form.Input
                name="orgAddress"
                type="text"
                fluid
                label="Organization Address"
              />
            </Container>
          )}
          <Button primary type="submit">
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
        <span>
          <a href="/auth/github">
            <Button color="facebook" size="big">
              <Icon name="github" />
              {displayName} with GitHub
            </Button>
          </a>
        </span>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
      //if organization, dispatches and creates an organization as well and takes the user's email and associates them with the newly created org
      if (evt.target.orgName) {
        let orgObj = {}
        orgObj.name = evt.target.orgName.value
        orgObj.description = evt.target.orgDescription.value
        orgObj.address = evt.target.orgAddress.value
        orgObj.email = evt.target.orgEmail.value
        orgObj.phoneNumber = evt.target.orgNumber.value
        dispatch(createOrg(orgObj, email))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
