import React, { Component } from 'react'
import {
  Container,
  Header,
  Form,
  Dropdown,
  Grid,
  Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let userObj = {}
    let userId = this.props.user.id
    userObj.email = evt.target.email.value
    userObj.imageUrl = evt.target.image.value
    userObj.password = evt.target.password.value
    userObj.firstname = evt.target.firstName.value
    userObj.lastname = evt.target.lastName.value
    this.props.editUser(userId, userObj)
  }

  render() {
    const FormInput = (name, type, label, value) => (
      <Grid.Column className="form-inputs" width={9}>
        <Form.Input
          width={14}
          required={true}
          name={name}
          type={type}
          fluid
          label={label}
          defaultValue={value}
        />
      </Grid.Column>
    )
    const {
      name,
      email,
      password,
      imageUrl,
      displayName,
      firstname,
      lastname
    } = this.props.user
    return (
      <Container>
        {this.props.user ? (
          <div className="form">
            <h1>Edit Profile</h1>
            <Form onSubmit={this.handleSubmit}>
              <Grid className="grid-style">
                {FormInput('email', 'email', 'User Email', email)}
              </Grid>
              <Grid className="grid-style">
                {FormInput('firstName', 'text', 'First Name', firstname)}
              </Grid>
              <Grid className="grid-style">
                {FormInput('lastName', 'text', 'Last Name', lastname)}
              </Grid>
              <Grid className="grid-style">
                {FormInput('password', 'password', 'Password', password)}
              </Grid>
              <Grid className="grid-style">
                {FormInput('image', 'text', 'User ImageURL', imageUrl)}
              </Grid>
              <Grid className="grid-style">
                <Container textAlign="center">
                  <Button type="submit">Submit</Button>
                  <Link to="/profile">
                    <Button>Cancel</Button>
                  </Link>
                </Container>
              </Grid>
            </Form>
          </div>
        ) : (
          <h1>There is no user here</h1>
        )}
      </Container>
    )
  }
}
