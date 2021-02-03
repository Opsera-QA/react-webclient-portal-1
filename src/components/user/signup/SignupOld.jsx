import React, { PureComponent } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import Modal from "components/common/modal/modal";
import { AuthContext } from "contexts/AuthContext";
import { ApiService } from "api/apiService";
import states from "components/user/states";
import { isAlphaNumeric, validateEmail } from "utils/helpers";

const state = {
  domain: { value: "", error: null },
  email: { value: "", error: null },
  firstName: { value: "", error: null },
  lastName: { value: "", error: null },
  organizationName: { value: "", error: null },
  password: { value: "", error: null },
  confirmPassword: { value: "", error: null },
  street: { value: "", error: null },
  zip: { value: "", error: null },
  city: { value: "", error: null },
  state: { value: "", error: null },
  modal: false,
  loading: false,
  sharedStack: true //turned on so we don't spin up systems
};


export default class Signup extends PureComponent {
  static contextType = AuthContext;
  state = state

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
  }

  async login() {
    const { loginUserContext } = this.context;
    loginUserContext();
  }

  handleCheckBox = (e) => {
    this.setState({
      sharedStack: e.target.checked
    });
  }

  handleChange = ({ target: { name, value } }) => {

    let error = null;
    if (name === "domain") {
      if (value.length > 20) error = "Domain has to be 20 chars or less";
      if (!isAlphaNumeric(value)) {
        error = "no special chars are allowed";
      }
      if (value === "") {
        error = "this field is required";
      }
    } else if (name === "password") {
      if (value.length < 8) error = "password is too short.";
    } else if (name === "email") {
      if (!validateEmail(value)) error = "email is not valid.";
    }

    this.setState({ [name]: { "value": value, "error": error } });
  }

  validateEmail = async () => {
    const { email } = this.state;
    var emailProperty = email;
    if (!validateEmail(email.value)) {
      emailProperty.error = "Email is not valid";
      this.setState({
        email: emailProperty
      });
      return true;
    }

    const apiCall = new ApiService("/users/check-email", {}, null, { email: email.value });
    const currentComponent = this;
    await apiCall.post()
      .then(function (response) {
        console.debug(response);
        if (response.data) {
          emailProperty.error = "Email already exists in our system!  Try logging in with this email now.";
          emailProperty.errorType = "warning";
          currentComponent.setState({
            email: emailProperty
          });
          return true;
        }
      })
      .catch(function (error) {
        console.error(error);
        return true;
      });
  }

  // password and confirm pass validation function 

  validatePassword = () => {
    const { password, confirmPassword } = this.state;

    var passwordProperty = password;
    var confirmPasswordProperty = confirmPassword;

    if (password.value.length < 8) {
      passwordProperty.error = "password is too short.";
      confirmPasswordProperty.error = "password is too short.";
      this.setState({
        password: passwordProperty,
        confirmPassword: confirmPassword
      });
      return true;
    } else if (password.value !== confirmPassword.value) {
      passwordProperty.error = "passwords don't match.";
      confirmPasswordProperty.error = "passwords don't match.";
      this.setState({
        password: passwordProperty,
        confirmPassword: confirmPassword
      });
      return true;
    }

    return false;
  }

  // domain basic validation

  validateDomain = () => {
    const { domain } = this.state;
    var domainProperty = domain;
    if (domain.value.length === 0) {
      domainProperty.error = "this field is required";
      this.setState({
        domain: domainProperty
      });
      return true;
    }
    if (domain.value.length > 20) {
      domainProperty.error = "too many characters.";
      this.setState({
        domain: domainProperty
      });
      return true;
    }
    if (!isAlphaNumeric(domain.value)) {
      domainProperty.error = "no special chars are allowed";
      this.setState({
        domain: domainProperty
      });
      return true;
    }

    return false;
  }

  // Overall form validation function 

  validate = async () => {
    let hasErrors = false;
    if (await this.validateEmail()) hasErrors = true;
    if (this.validatePassword()) hasErrors = true;
    //if (this.validateDomain()) hasErrors = true;
    [
      "firstName",
      "lastName",
      "organizationName",
      "state",
      //"street",
      "zip",
      "city",
    ].map(item => {
      if (this.state[item].value.length <= 0) {
        var itemProperty = this.state[item];
        itemProperty.error = "This field is required";
        hasErrors = true;
        this.setState({
          item: itemProperty
        });
      }
    });
    return hasErrors;
  }

  // Signup Function

  signup = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    if (await this.validate()) {
      this.setState({ loading: false });
      return;
    }

    let formData = Object.keys(this.state).reduce((obj, key) => {
      if (this.state[key].value) {
        obj[key] = this.state[key].value;
      }

      return obj;
    }, {});

    const apiCall = new ApiService("/users/create", {}, null, formData);
    let currentComponent = this;
    await apiCall.post()
      .then(function (response) {
        console.debug(response);
        currentComponent.setState({ loading: false });
        //currentComponent.showSuccessAlert();

        //TODO: Send user to new registration confirmation form:
        currentComponent.loadRegistrationResponse();


      })
      .catch(function (error) {
        console.error(error);
        currentComponent.setState({ loading: false });
        currentComponent.showErrorAlert();
      });
  }

  // Success alert function 

  showSuccessAlert = () => {

    let message = this.state.sharedStack ? "Registration was successful.  Because you chose to use a shared analytics instance, your account will be configured to share an existing profile.  Please work with an OpsERA representative to complete this setup based on your company policies.  You may now login using your credentials." : "Registration was successful, please Login now using your new credentials.";

    this.setState({
      modal: true,
      type: "success",
      title: "Signup Successfull!",
      message: message
    }, () => { this.resetForm(); });
  }

  // Error error Alert Dialog
  showErrorAlert = () => {
    let errorType = "danger";
    let errorTitle = "Error";
    let errorMessage = "Opps!  Something went wrong, please try again later";

    //Look for a warning event on key data points: email
    if (this.state.email.errorType) {
      errorTitle = "Email Alert";
      errorType = this.state.email.errorType;
      errorMessage = this.state.email.error;
    }

    this.setState({
      modal: true,
      type: errorType,
      title: errorTitle,
      message: errorMessage
    });
  }

  // reset form function 

  resetForm = () => {
    this.setState({
      domain: { value: "", error: null },
      email: { value: "", error: null },
      firstName: { value: "", error: null },
      lastName: { value: "", error: null },
      organizationName: { value: "", error: null },
      password: { value: "", error: null },
      confirmPassword: { value: "", error: null },
      street: { value: "", error: null },
      zip: { value: "", error: null },
      city: { value: "", error: null },
      state: { value: "", error: null },
    });
  }

  // checks if all required fields are filled or not

  canBeSubmitted() {
    const {
      domain,
      sharedStack,
      email,
      firstName,
      lastName,
      organizationName,
      password,
      confirmPassword,
      //street,
      zip,
      city,
      state,
    } = this.state;
    return (
      (domain.value.length > 0 || sharedStack) &&
      email.value.length > 0 &&
      firstName.value.length > 0 &&
      lastName.value.length > 0 &&
      organizationName.value.length > 0 &&
      password.value.length > 0 &&
      confirmPassword.value.length > 0 &&
      //street.value.length > 0 &&
      zip.value.length > 0 &&
      city.value.length > 0 &&
      state.value.length > 0
    );
  }

  cancelSignup = () => {
    let path = "/";
    // eslint-disable-next-line react/prop-types
    this.props.history.push(path);
  }

  loadRegistrationResponse = () => {
    // eslint-disable-next-line react/prop-types
    this.props.history.push("/registration");
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <div className="max-content-module-width-50 ml-5">
        
        {this.state.modal &&
        <>
          {this.state.type === "success" ? <Modal header="Success!" 
            message={this.state.message} 
            button="Log In"  
            handleConfirmModal={this.login}
            handleCancelModal={this.login}/> : 
        
            <Alert variant={this.state.type} onClose={() => this.setState({ modal: false, type: "", title: "", message: "" })} dismissible>
              {this.state.title}: {this.state.message}
            </Alert>
          }
        </>
        }
        <Form onSubmit={this.signup}>
          <Card style={{ marginTop: 25 }}>
            <Card.Header as="h5">New User Signup</Card.Header>
            <Card.Body>

              <Form.Row>
                
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name*</Form.Label>
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
                  <Form.Label>Last Name*</Form.Label>
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
                  <Form.Label>Email*</Form.Label>
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
                  <Form.Label>Company*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="organizationName"
                    maxLength="20"
                    value={this.state.organizationName.value}
                    onChange={this.handleChange}
                    isInvalid={this.state.organizationName.error}
                  />
                  <Form.Control.Feedback type="invalid">{this.state.organizationName.error}</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password*</Form.Label>
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
                  <Form.Label>Confirm Password*</Form.Label>
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
                  <Form.Label>City*</Form.Label>
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
                  <Form.Label>State*</Form.Label>
                  <Form.Control as="select"
                    name="state"
                    isInvalid={this.state.state.error}
                    value={this.state.state.value}
                    onChange={this.handleChange}>
                    <option value="" disabled>Please select</option>
                    {states.map(state => (
                      <option key={state.value} value={state.value}>{state.text}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{this.state.state.error}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip*</Form.Label>
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

              <Form.Group controlId="formGridAddress2" className="mt-3 mb-3">
                <Form.Label>New Resource Subdomain Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="domain"
                  //disabled={this.state.sharedStack}
                  value={this.state.domain.value}
                  onChange={this.handleChange}
                  isInvalid={this.state.domain.error}
                />
                <Form.Text className="text-muted">When new resources are created for this account, this will be the default sub-domain name used when building DNS records. 
                  {/* Either supply a subdomain name or check the box below to share an existing configuration in order to proceed. */}
                </Form.Text>
                <Form.Control.Feedback type="invalid">{this.state.domain.error}</Form.Control.Feedback>
                
                {/* <Form.Check type="checkbox" label="Share an existing or on-prem analytics platform."
                  className="mt-2" 
                  checked={this.state.sharedStack} 
                  onChange={this.handleCheckBox} />
                <Form.Text className="text-muted"></Form.Text> */}
              </Form.Group>
              
              { this.state.loading ?
                <Button id="login-button" disabled={true} variant="outline-success" className="mr-2 px-4" type="button">Working...</Button> :
                <Button id="login-button" disabled={!isEnabled} variant="success" className="mr-2 px-4" type="submit">Register Account</Button>
              }  

              <Button id="cancel-button" variant="outline-secondary" className="ml-2" type="button" onClick={this.cancelSignup}>Cancel</Button>
              <div className="mt-1 text-muted text-right">* Required Fields</div>

            </Card.Body>
          </Card>
        </Form>
      </div>
    );
  }
}
