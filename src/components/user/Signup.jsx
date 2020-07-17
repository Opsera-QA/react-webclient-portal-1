import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import Modal from "components/common/modal";
import { AuthContext } from "contexts/AuthContext";  
import { ApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import validate from "utils/formValidation";
import defaultSignupFormFields from "./signup-form-fields.js";
import usStateList from "./states";

import "./user.css";
import TextInput from "../common/input/text-input";
import SelectInput from "../common/input/select-input";

const INITIAL_DATA = {
  domain: "",
  organizationName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  attributes: { title: "", company: "" },
  configuration: { cloudProvider: "EKS", cloudProviderRegion: "us-east-2" }
};

function Signup(props) {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [ signupFormFields, updateFormFields ] = useState(defaultSignupFormFields);
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [ emailAlreadyExists, setEmailAlreadyExists ] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const isFormValid = () => {
    // TODO: Write way to check for required fields via the fields themselves
    let { firstName, lastName, organizationName, email, password, confirmPassword, city, state, zip, domain, configuration } = formData;
    if (
      firstName.length === 0 ||
        lastName.length === 0 ||
        organizationName.length === 0 ||
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0||
        city.length === 0 ||
        state.length === 0 ||
        zip.length === 0 ||
        configuration["cloudProvider"].length === 0 ||
        configuration["cloudProviderRegion"].length === 0
    ) {
      setFormMessage("All required fields must be filled out.");
      return false;
    }
    else if (password.length < 8) {
      setFormMessage("Your password must be at least 8 characters.");
      return false;
    }
    else if (password !== confirmPassword) {
      setFormMessage("Both password fields must match.");
      return false;
    }
    else
    {
      setFormMessage("");
      return true;
    }
  };

  // TODO: when pulling actual data with react-dropdown, change text to label
  const cloudProviders = [ { value: "EKS", text: "AWS" }];
  const cloudProviderRegions = [ { value: "us-east-2", text: "us-east-2" }];

  //Check if the email is already registered in the system
  const isEmailAvailable = async () => {
    console.log("checking email: " + formData.email);
    const apiCall = new ApiService("/users/check-email", {}, null, { email: formData.email });
    await apiCall.post()
      .then(function (response) {
        if (response.data) {
          setEmailAlreadyExists(true);
          setFormMessage("Email address already exists.");
          return false;
        }
      })
      .catch(function (error) {
        console.error(error);
        setEmailAlreadyExists(false);
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

    console.log("formData: ", formData);

    //Check if the email is already exist in the system
    await isEmailAvailable();

    //Only if form is valid, call API for signup 
    if(isFormValid() && !emailAlreadyExists) {
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

  const setFormField = (field, value) => {
    formData[field] = value;
    setFormData({ ...formData });
    console.log("Form data: " + JSON.stringify(formData));
  };

  const setAttribute = (field, value) => {
    formData["attributes"][field] = value;
    setFormData({ ...formData, attributes: formData["attributes"] });
  };

  const setConfiguration = (field, value) => {
    formData["configuration"][field] = value;
    setFormData({ ...formData, configuration: formData["configuration"] });
  };

  return (
    <div className="new-user-signup-form">
      <Form className="full-signup-form m-auto" noValidate onSubmit={signupSubmit} >
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For OpsERA</Card.Header>
          <Card.Body className="new-user-body-full p-3">
            { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
            <div className="formContainer">
              <div className="col-6">
                <TextInput field={ signupFormFields.firstName } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.email } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.password } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.street } setData={setFormField} formData={formData}/>
                <SelectInput selectOptions={usStateList} field={ signupFormFields.state } setData={setFormField} formData={formData}/>
                <SelectInput selectOptions={cloudProviders} field={ signupFormFields.cloudProvider } setData={setConfiguration} formData={formData["configuration"]}/>
              </div>
              <div className="col-6">
                <TextInput field={ signupFormFields.lastName } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.organizationName } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.confirmPassword } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.city } setData={setFormField} formData={formData}/>
                <TextInput field={ signupFormFields.zip } setData={setFormField} formData={formData}/>
                <SelectInput selectOptions={cloudProviderRegions} field={ signupFormFields.cloudProviderRegion } setData={setConfiguration} formData={formData["configuration"]}/>
              </div>
              <div className="col-12">
                <TextInput field={ signupFormFields.domain } setData={setFormField} formData={formData}/>
              </div>
            </div>

            { isLoading ?
              <Button id="login-button" disabled={true} variant="outline-success" className="mr-2 px-4" type="button"><span>Working...</span></Button> :
              <Button size="md" className="register-button mx-auto" id="login-button" type="submit" variant="success"><span>Register Account</span></Button>
            }
            {/*<Button id="cancel-button" variant="outline-secondary" className="ml-2" type="button" onClick={cancelSignup}>Cancel</Button>*/}
          </Card.Body>
          <Card.Footer className="new-user-footer"><div className="text-muted text-right pr-2"><span className="danger-red">*</span> Required Fields</div></Card.Footer>
        </Card>
      </Form>
    </div>
  );
}

export default Signup;