import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import { ApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const INITIAL_DATA = {
  domain: "freetrial",
  organizationName: "freetrial",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  street: "",
  city: "",
  state: "",
  zip: "",
};

const fieldsToValidate = ["firstName", "lastName", "email", "password", "confirmPassword"];


function FreeTrialSignup(props) {
  //const { authService } = useOktaAuth();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [formMessage, setFormMessage] = useState("");
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [ emailAlreadyExists, setEmailAlreadyExists ] = useState(false);


  useEffect(() => {   
    //authService.clearAuthState();
  }, []);


  const validateRequiredFields = () => {
    let { firstName, lastName, email, password, confirmPassword } = formData;
    if ( firstName.length === 0 ||
        lastName.length === 0 ||
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0
    ) {
      setFormMessage("All fields must be filled out.");
      return false;
    }
    else if (password.length < 8) {
      setFormMessage("Your password must be at least 8 characters.");
    }
    else if (password !== confirmPassword) {
      setFormMessage("Both password fields must match.");
      return false;
    }
    else
    {
      setFormMessage("");
      return false;
    }
  };

  //Check if the email is already registered in the system
  const isEmailAvailable = async () => {
    const apiCall = new ApiService("/users/check-email", {}, null, { email: formData.email.value });
    await apiCall.post()
      .then(function (response) {
        if (response.data) {
          setEmailAlreadyExists(true);
        }
      })
      .catch(function (error) {
        console.error(error);
        return true;
      });
  };

  const loadRegistrationResponse = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/trial/registration");
  };

  //Final form submit
  const signupSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    //Check if the email is already exist in the system
    // isEmailAvailable();
    console.log("Final Form Data: " + JSON.stringify(formData));

    //Only if form is valid, call API for sign up
    if(validateRequiredFields()) {
      setLoading(true);
      const apiCall = new ApiService("/users/create", {}, null, formData);
      await apiCall.post()
        .then(function (response) {
          console.debug(response);
          setLoading(false);
          //showSuccessAlert();
          //TODO: Send user to new registration confirmation form:
          loadRegistrationResponse();
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
          //showErrorAlert();
        });

    } else {
      setLoading(false);
    }
  };

  return (
    <div className="max-content-module-width-25 mx-auto new-user-signup-form">
      <img alt="OpsERA"
        src="/img/opsera_logo_170x35.png"
        width="170"
        height="35"
        className="mb-3"
      />
      <Form noValidate onSubmit={signupSubmit} >
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For OpsERA</Card.Header>
          <Card.Body className="new-user-body p-3">
            { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
            <div className="formContainer">
              <Form.Group controlId="firstName">
                <Form.Label><span>First Name<span className="danger-red">*</span></span></Form.Label>
                <Form.Control type="text" value={formData.firstName || ""} onChange={e => setFormData({ ...formData, firstName: e.target.value })}/>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label><span>Last Name<span className="danger-red">*</span></span></Form.Label>
                <Form.Control type="text" value={formData.lastName || ""} onChange={e => setFormData({ ...formData, lastName: e.target.value })}/>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label><span>Email<span className="danger-red">*</span></span></Form.Label>
                <Form.Control type="text" value={formData.email || ""} onChange={e => setFormData({ ...formData, email: e.target.value })}/>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label><span>Password<span className="danger-red">*</span></span></Form.Label>
                <Form.Control value={formData.password || ""} type="password" onChange={e => setFormData({ ...formData, password: e.target.value })}/>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label><span>Confirm Password<span className="danger-red">*</span></span></Form.Label>
                <Form.Control value={formData.confirmPassword || ""} type="password" onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}/>
              </Form.Group>
            </div>

            { isLoading ?
              <Button id="login-button" disabled={true} variant="outline-success" className="mr-2 px-4" type="button"><span>Working...</span></Button> :
              <Button size="md" className="register-button mx-auto" id="login-button" disabled={validateRequiredFields} type="submit" variant="success"><span>Register Account</span></Button>
            }
            {/*<Button id="cancel-button" variant="outline-secondary" className="ml-2" type="button" onClick={cancelSignup}>Cancel</Button>*/}
          </Card.Body>
          <Card.Footer className="new-user-footer"><div className="text-muted text-right pr-2"><span className="danger-red">*</span> Required Fields</div></Card.Footer>
        </Card>
      </Form>
    </div>
  );
}
export default FreeTrialSignup;