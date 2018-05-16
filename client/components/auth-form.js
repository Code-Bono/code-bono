import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { createOrg } from '../store/organization'
import {
  Form,
  Button,
  Container,
  Icon,
  Grid,
  Header,
  Checkbox
} from 'semantic-ui-react'

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
    const FormInput = (name, type, label, placeholder) => (
      <Grid.Column className="form-inputs" width={9}>
        <Form.Input
          width={14}
          required={true}
          name={name}
          type={type}
          fluid
          label={label}
          placeholder={placeholder}
        />
      </Grid.Column>
    )

    return (
      <div className="form">
        <Container>
          <Header as="h2" icon textAlign="center">
            {name === 'signup' ? (
              <Icon name="signup" />
            ) : (
              <Icon name="sign in" />
            )}

            {displayName}
          </Header>
        </Container>
        <Container textAlign="center" id="github-oauth">
          <a href="/auth/github">
            <Button color="facebook" size="medium">
              <Icon name="github" />
              Developer? {displayName} with GitHub!
            </Button>
          </a>
        </Container>

        <Form onSubmit={handleSubmit} name={name}>
          {displayName === 'Sign Up' && (
            <Form.Field id="org-checkbox">
              <Checkbox
                onChange={this.handleChange}
                label="I am a representative for an organization"
              />
            </Form.Field>
          )}
          <Grid className="grid-style">
            {name === 'signup'
              ? FormInput('firstname', 'text', 'First Name', 'Jane')
              : null}
            {name === 'signup'
              ? FormInput('lastname', 'text', 'Last Name', 'Doe')
              : null}
            {FormInput('email', 'email', 'Email', 'jane@doe.com')}
            {FormInput('password', 'password', 'Password', 'password!')}
          </Grid>
          {this.state.isOrg && (
            <Grid className="grid-style">
              {FormInput(
                'orgName',
                'text',
                'Organizaton Name',
                "Jane's Wildlife Fund"
              )}
              {FormInput(
                'orgAddress',
                'text',
                'Organization Address',
                '15 Jane Street, Suite 2, Tortuguero, Costa Rica'
              )}
              {FormInput(
                'orgNumber',
                'text',
                'Organization Phone #',
                '+506 123 4567'
              )}
              {FormInput(
                'orgEmail',
                'email',
                'Organizaton Email',
                'wildlifefund@info.org'
              )}
              {FormInput(
                'orgDescription',
                'text',
                'Organization Description',
                'Tell us about your organization!'
              )}
            </Grid>
          )}

          <Container textAlign="center">
            {error && error.response && <div> {error.response.data} </div>}
          </Container>
          <Container className="page-name" textAlign="center">
            <Button size="medium" primary type="submit">
              {displayName}
            </Button>
          </Container>
        </Form>
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
      let firstname
      let lastname
      if (evt.target.firstname) {
        firstname = evt.target.firstname.value
        lastname = evt.target.lastname.value
      }
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, firstname, lastname, formName))
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
