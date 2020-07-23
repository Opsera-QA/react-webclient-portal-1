import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import { ApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import TextInput from "../common/input/text-input";
import defaultSignupFormFields from "../user/signup-form-fields";

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
  attributes: { title: "", company: "" },
  configuration: { cloudProvider: "EKS", cloudProviderRegion: "us-east-2" }
};

function FreeTrialSignup(props) {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [formMessage, setFormMessage] = useState("");
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [ emailAlreadyExists, setEmailAlreadyExists ] = useState(false);
  const [ signupFormFields, updateFormFields ] = useState(defaultSignupFormFields);


  const isFormValid = () => {
    let { firstName, lastName, email, password, confirmPassword } = formData;
    if ( firstName.length === 0 ||
        lastName.length === 0 ||
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0
    ) {
      setFormMessage("All required fields must be filled out.");
      return false;
    }
    else if (password.length < 8) {
      setFormMessage("Your password must be at least 8 characters.");
      return false;
    }
    else if (email.includes("@yopmail.com")) {
      setFormMessage("Yopmail not supported");
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

  const loadRegistrationResponse = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/trial/landing");
  };

  //Final form submit
  const signupSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("formData: ", formData);

    //Check if the email is already exist in the system
    await isEmailAvailable();
    // console.log("Final Form Data: " + JSON.stringify(formData));

    //Only if form is valid, call API for sign up
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
  };

  const setAttribute = (field, value) => {
    formData["attributes"][field] = value;
    setFormData({ ...formData, attributes: formData["attributes"] });
  };


  return (
    <div className="new-user-signup-form">
      <Form className="free-trial-form m-auto" noValidate onSubmit={signupSubmit} >
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
          <Card.Body className="new-user-body p-3">
            { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
            <div className="formContainer">
              <TextInput field={ signupFormFields.firstName } setData={setFormField} formData={formData}/>
              <TextInput field={ signupFormFields.lastName } setData={setFormField} formData={formData}/>
              <TextInput field={ signupFormFields.email } setData={setFormField} formData={formData}/>
              <TextInput field={ signupFormFields.company } setData={setAttribute} formData={formData["attributes"]}/>
              <TextInput field={ signupFormFields.title } setData={setAttribute} formData={formData["attributes"]}/>
              <TextInput field={ signupFormFields.password } setData={setFormField} formData={formData}/>
              <TextInput field={ signupFormFields.confirmPassword } setData={setFormField} formData={formData}/>
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
export default FreeTrialSignup;