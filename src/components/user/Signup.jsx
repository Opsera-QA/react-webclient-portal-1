import React, { PureComponent } from 'react'
import { Button, Form, Col, Card, Alert } from 'react-bootstrap';
import {api2} from "../../api/"
import states from "./states"
import {isAlphaNumeric, validateEmail} from "../../helpers"

const state = {
    domain: {value: "", error: null},
    email: {value: "", error: null},
    firstName: {value: "", error: null},
    lastName: {value: "", error: null},
    organizationName: {value: "", error: null},
    password: {value: "", error: null},
    confirmPassword: {value: "", error: null},
    street: {value: "", error: null},
    zip: {value: "", error: null},
    city: {value: "", error: null},
    state: {value: "", error: null},
    modal: false,
    loading: false,
  }

export default class Signup extends PureComponent {
  state = state

  handleChange = (e) => {
    this.setState({ [e.target.name]: {"value" : e.target.value , "error" : null}});
  }

  validateEmail = async () => {
    const {email} = this.state
    var emailProperty = email
    if (!validateEmail(email.value)) {
        emailProperty.error = "email is not valid"
      this.setState({
        email : emailProperty
      })
      return true
    }

    try {
      const exists = await api2({
        endpoint: "/users/check-email",
        body: {email: email.value},
      })

      if (exists.data) {
        emailProperty.error = "email already exists"
        this.setState({
          email : emailProperty
        })
        return true
      }
    } catch (error) {
      alert("something went wrong validating your email address")
      console.log(error)
      return true
    }
  }
  
  validatePassword = () => {
    const {password, confirmPassword} = this.state
    
    var passwordProperty = password
    var confirmPasswordProperty = confirmPassword

    console.log(password.value.length)
    if (password.value.length < 8) {
        passwordProperty.error = "password is too short."
        confirmPasswordProperty.error = "password is too short."
      this.setState({
          password : passwordProperty,
          confirmPassword : confirmPassword
        })
      return true
    } else if (password.value !== confirmPassword.value) {
        passwordProperty.error = "passwords don't match."
        confirmPasswordProperty.error = "passwords don't match."
      this.setState({
        password : passwordProperty,
        confirmPassword : confirmPassword
      })
      return true
    }

    return false
  }
  
  validateDomain = () => {
    const {domain} = this.state
    var domainProperty = domain
    if (domain.value.length == 0) {
        domainProperty.error = "this field is required"
      this.setState({
          domain : domainProperty
      })
      return true
    }
    if (domain.value.length > 10) {
        domainProperty.error = "too many characters."
        this.setState({
            domain : domainProperty
        })
      return true
    }
    if (!isAlphaNumeric(domain.value)) {
        domainProperty.error = "no special chars are allowed"
        this.setState({
            domain : domainProperty
        })
      return true
    }

    return false
  }

  validate = async () => {
    let hasErrors = false
    if (await this.validateEmail()) hasErrors = true
    if (this.validatePassword()) hasErrors = true
    if (this.validateDomain()) hasErrors = true
    ;[
      "firstName",
      "lastName",
      "organizationName",
      "state",
      "street",
      "zip",
      "city",
    ].map(item => {
      if (this.state[item].value.length <= 0) {
         var itemProperty = this.state[item]
         itemProperty.error = "This field is required"
        hasErrors = true
        this.setState({
            item : itemProperty
          })
      }
    })
    return hasErrors
  }

  signup = async e => {
    e.preventDefault()
    this.setState({loading: true})

    if (await this.validate()) {
      this.setState({loading: false})
      return
    }

    try {
      await api2({
        endpoint: "/users",
        body: Object.keys(this.state).reduce((acc, key) => {
          if (this.state[key].value) {
            acc[key] = this.state[key].value
          }
          return acc
        }, {}),
      })
      this.showAlert()
    } catch (error) {
      alert("something went wrong, please try again later")
    }

    this.setState({loading: false})
  }

  
  showAlert = () => {
    this.setState({
      modal: true,
      loading: false,
    }, ()=>{this.resetForm()})
  }

  resetForm = () => {
    this.setState({
        domain: {value: "", error: null},
        email: {value: "", error: null},
        firstName: {value: "", error: null},
        lastName: {value: "", error: null},
        organizationName: {value: "", error: null},
        password: {value: "", error: null},
        confirmPassword: {value: "", error: null},
        street: {value: "", error: null},
        zip: {value: "", error: null},
        city: {value: "", error: null},
        state: {value: "", error: null},
    })
  }

  canBeSubmitted() {
    const {
      domain,
      email,
      firstName,
      lastName,
      organizationName,
      password,
      confirmPassword,
      street,
      zip,
      city,
      state,
    } = this.state
    return (
      domain.value.length > 0 &&
      email.value.length > 0 &&
      firstName.value.length > 0 &&
      lastName.value.length > 0 &&
      organizationName.value.length > 0 &&
      password.value.length > 0 &&
      confirmPassword.value.length > 0 &&
      street.value.length > 0 &&
      zip.value.length > 0 &&
      city.value.length > 0 &&
      state.value.length > 0
    )
  }

    render() {
        const isEnabled = this.canBeSubmitted()
        return (
            <div>
            { this.state.modal &&  <Alert variant="success" onClose={() => this.setState({modal:false})} dismissible>
              <Alert.Heading>Signup Successfull!</Alert.Heading>
                <p>
                Registration was successful, please Sign In using your credentials.
                </p>
              </Alert> 
            }
            <Card style={{ marginTop: 25 }}>
                <Card.Header as="h5">New User Signup</Card.Header>
                <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>

                    <Form onSubmit={this.signup}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="firstName" placeholder="" 
                                value={this.state.firstName.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.firstName.error} 
                            />
                            <Form.Control.Feedback type="invalid">{this.state.firstName.error}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                name="lastName"
                                value={this.state.lastName.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.lastName.error} 
                            />
                            <Form.Control.Feedback type="invalid">{this.state.lastName.error}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="" 
                                name="email"
                                value={this.state.email.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.email.error}
                            />
                            <Form.Control.Feedback type="invalid">{this.state.email.error}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Company</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                name="organizationName"
                                value={this.state.organizationName.value}
                                onChange={this.handleChange} 
                                isInvalid={this.state.organizationName.error}
                            />
                            <Form.Control.Feedback type="invalid">{this.state.organizationName.error}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="" 
                                name="password"
                                value={this.state.password.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.password.error} 
                            />
                            <Form.Control.Feedback type="invalid">{this.state.password.error}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="" 
                                name="confirmPassword"
                                value={this.state.confirmPassword.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.confirmPassword.error} 
                            />
                            <Form.Control.Feedback type="invalid">{this.state.confirmPassword.error}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            name="street"
                            value={this.state.street.value}
                            onChange={this.handleChange}
                            isInvalid={this.state.street.error}
                        />
                        <Form.Control.Feedback type="invalid">{this.state.street.error}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder=""  
                                name="city"
                                value={this.state.city.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.city.error} 
                            />
                            <Form.Control.Feedback type="invalid">{this.state.city.error}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select"
                                name="state"
                                isInvalid={this.state.state.error} 
                                value={this.state.state.value}
                                onChange={this.handleChange}>
                                <option value="" selected disabled>Please select</option>
                                {states.map(state => (
                                    <option value={state.value}>{state.text}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{this.state.state.error}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder=""  
                                name="zip"
                                value={this.state.zip.value}
                                onChange={this.handleChange}
                                isInvalid={this.state.zip.error} 
                            />
                            <Form.Control.Feedback type="invalid">{this.state.zip.error}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Subdomain Name</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="" 
                            name="domain"
                            value={this.state.domain.value}
                            onChange={this.handleChange}
                            isInvalid={this.state.domain.error} 
                        />
                        <Form.Control.Feedback type="invalid">{this.state.domain.error}</Form.Control.Feedback>
                    </Form.Group>
                    <Button id="login-button" disabled={!isEnabled} variant="success" className="mr-2" type="submit">Sign Up</Button>
                    </Form>
                </Card.Text>
                </Card.Body>
            </Card>

            </div>
        )
    }
}
