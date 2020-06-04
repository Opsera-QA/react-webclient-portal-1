import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import Modal from "components/common/modal";
import { AuthContext } from "contexts/AuthContext";  
import { ApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import validate from "./signup-validation.js";
import defaultSignupFormFields from "./signup-form-fields.js";
import usStateList from "./states";

import "./user.css";

function Signup(props) {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [ signupFormFields, updateFormFields ] = useState(defaultSignupFormFields);
    
  const handleChange = ({ target: { value } }, field ) => {
    //Validate the form fields based on rule
    let { isValid, errorMessage } = validate(value, field);
    let validateInput = {
      valid: isValid,   
      error: field.id == "domain" ? field.error : errorMessage,
      touched: true,      
      value: value
    };
    //update the form fields for value, error and touched
    updateFormFields(prevState => ({ 
      ...prevState, 
      [field.id]: { 
        ...prevState[field.id],
        ...validateInput
      } 
    }));
  };

  //At any given time, check if all the mandatory field is valid or not
  const isFormValid = !Object.values(signupFormFields).every(x => (x.valid == true));

  //Check if the email is already registered in the system
  const isEmailAvailable = async () => {
    const apiCall = new ApiService("/users/check-email", {}, null, { email: signupFormFields.email.value });
    await apiCall.post()
      .then(function (response) {
        if (response.data) {
          updateFormFields(prevState => ({ 
            ...prevState, 
            email: { 
              ...prevState.email,
              valid: false,
              error: "Email already exists in our system!  Try logging in with this email now."
            } 
          }));
        }
      })
      .catch(function (error) {
        console.error(error);
        return true;
      });
  };

  const cancelSignup = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/");
  };

  const loadRegistrationResponse = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/registration");
  };

  //Final form submit
  const signupSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    //Check if the email is already exist in the system
    isEmailAvailable();

    //Only if form is valid, call API for signup 
    if(isFormValid) {
      setLoading(true);
      let formData = Object.keys(signupFormFields).reduce((obj, key) => {
        obj[key] = signupFormFields[key].value;
        return obj;
      }, {});

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

  //Dymamically render the form fields
  const formFieldType = (field) => {
    switch (field.type) {
    case "password":
      return <Form.Control 
        type="password"
        onChange={(e) => {handleChange(e, field);}} isInvalid={field.touched && !field.valid}
      />;     
    case "select":
      return <Form.Control as="select" onChange={(e) => {handleChange(e, field);}} isInvalid={field.touched && !field.valid}>
        {usStateList.map((option, i) => (
          <option key={i}>{option.text}</option>
        ))} 
      </Form.Control>;
    default:
      return  <Form.Control  onChange={(e) => {handleChange(e, field);}} isInvalid={field.touched && !field.valid} />;
    }
  };

  return (
    <div className="max-content-module-width-50 ml-5">
      <Form noValidate onSubmit={signupSubmit} >
        <Card style={{ marginTop: 25 }}>
          <Card.Header as="h5">New User Signup</Card.Header>
          <Card.Body>
         
            <div className="formContainer">
              {Object.values(signupFormFields).map((field, i) => {
                return(
                  <Form.Group  as={Row} key={i} style={{ width: field.width +"%" }} controlId={field.id}>
                    <Form.Label>
                      {field.label} {field.rules.isRequired && <span style={{ color: "#dc3545" }}>*</span>}
                    </Form.Label>
                    {formFieldType(field)}
                    {field.id == "domain" &&
                      <Form.Text className="text-muted">When new resources are created for this account, this will be the default sub-domain name used when building DNS records. 
                        {/* Either supply a subdomain name or check the box below to share an existing configuration in order to proceed. */}
                      </Form.Text> 
                    }
                    <Form.Control.Feedback type="invalid">{field.error}</Form.Control.Feedback>
                  </Form.Group>
                );  
              })}
            </div>

            { isLoading ?
              <Button id="login-button"  disabled={true} variant="outline-success" className="mr-2 px-4" type="button">Working...</Button> :
              <Button id="login-button"  disabled= {isFormValid} variant="success" className="mr-2 px-4" type="submit">Register Account</Button>
            }
            <Button id="cancel-button" variant="outline-secondary" className="ml-2" type="button" onClick={cancelSignup}>Cancel</Button>
            <div className="mt-1 text-muted text-right">* Required Fields</div>

          </Card.Body>
        </Card>
      </Form>
    </div>
  );
}

export default Signup;