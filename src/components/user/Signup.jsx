import React, {useEffect, useState} from "react";
import { Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import { ApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import defaultSignupFormFields from "./signup-form-fields.js";
import usStateList from "./states";

import "./user.css";
import Model from "../../core/data_model/model";
import {
  getEmailAlreadyExistsErrorDialog,
  getErrorDialog,
  getFormValidationErrorDialog,
  getUpdateFailureResultDialog
} from "../common/toasts/toasts";
import DtoTextInput from "../common/input/dto_input/dto-text-input";
import DtoSelectInput from "../common/input/dto_input/dto-select-input";
import LoadingDialog from "../common/status_notifications/loading";
import SaveButton from "../common/buttons/SaveButton";

function Signup() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);

  // TODO: when pulling actual data with react-dropdown, change text to label
  const cloudProviders = [{ value: "EKS", text: "AWS" },{ value: "GKE", text: "GCP" }];
  const cloudProviderRegions = [{ value: "us-east-2", text: "us-east-2" }];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await setRegistrationDataDto(new Model(defaultSignupFormFields.newObjectFields, defaultSignupFormFields, true));
    setIsLoading(false);
  };

  //Check if the email is already registered in the system
  const isEmailAvailableFunc = async () => {
    console.log("checking email: " + registrationDataDto.getData("email"));
    const apiCall = new ApiService("/users/check-email", {}, null, { email: registrationDataDto.getData("email") });
    return await apiCall.post()
      .then(function(response) {
        console.log("response in then: " + JSON.stringify(response));
        if (response.data) {
          getErrorDialog("Email address already exists.", setShowToast, "top");
          return false;
        } else {
          return true;
        }
      })
      .catch(function(error) {
        console.log("response in catch: " + JSON.stringify(error));
        console.error(error);
        return true;
      });
  };

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  //Final form submit
  const signupSubmit = async () => {

    console.log("persistData: ", JSON.stringify(registrationDataDto.getPersistData()));

    if (registrationDataDto.isModelValid2()) {
      //Check if the email is already exist in the system
      const isEmailAvailable = await isEmailAvailableFunc();

      //Only if form is valid, call API for signup
      if (isEmailAvailable) {
        // setIsLoading(true);

        let finalObject = {...registrationDataDto.getPersistData()};
        let configuration = {
          cloudProvider: registrationDataDto.getData("cloudProvider"),
          cloudProviderRegion: registrationDataDto.getData("cloudProviderRegion")
        };
        let attributes = {title: "", company: ""};
        delete finalObject["cloudProviderRegion"];
        delete finalObject["cloudProvider"];
        finalObject["configuration"] = configuration;
        finalObject["attributes"] = attributes;

        const apiCall = new ApiService("/users/create", {}, null, registrationDataDto.getPersistData());
        await apiCall.post()
          .then(function (response) {
            console.debug(response);
            setIsLoading(false);
            //showSuccessAlert();
            //TODO: Send user to new registration confirmation form:
            loadRegistrationResponse();
          })
          .catch(function (error) {
            console.error(error);
            setIsLoading(false);
            let toast = getUpdateFailureResultDialog("Account", error.message, setShowToast, "top");
            setToast(toast);
            setShowToast(true);
            console.error(error.message);
          });
      }
      else {
        let toast = getEmailAlreadyExistsErrorDialog(setShowToast, "top");
        setToast(toast);
        setShowToast(true);
      }
    }else {
      let toast = getFormValidationErrorDialog(setShowToast, "top");
      setToast(toast);
      setShowToast(true);
    }
  };

  if (isLoading || registrationDataDto == null) {
    return <LoadingDialog />
  }

  return (
    <div className="new-user-signup-form">
      <Form className="full-signup-form m-auto" noValidate onSubmit={signupSubmit}>
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
          <Card.Body className="new-user-body-full p-3">
            {showToast && toast}
            <Row>
              <Col md={6}>
                <DtoTextInput fieldName={"firstName"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoTextInput fieldName={"lastName"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <DtoTextInput fieldName={"email"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoTextInput type="password" fieldName={"password"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoTextInput type="password" fieldName={"confirmPassword"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoTextInput fieldName={"organizationName"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoTextInput fieldName={"domain"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <DtoTextInput fieldName={"street"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={4}>
                <DtoTextInput fieldName={"city"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={4}>
                <DtoSelectInput selectOptions={usStateList} fieldName={"state"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={4}>
                <DtoTextInput fieldName={"zip"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoSelectInput selectOptions={cloudProviders} fieldName={"cloudProvider"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <DtoSelectInput selectOptions={cloudProviderRegions} fieldName={"cloudProviderRegion"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
            </Row>
            <Row>
              <div className="ml-auto m-3 px-3">
                <SaveButton type={"account"} createRecord={signupSubmit} recordDto={registrationDataDto} altButtonText={"Register Account"}/>
              </div>
            </Row>
          </Card.Body>
          <Card.Footer className="new-user-footer">
            <div className="text-muted text-right pr-2"><span className="danger-red">*</span> Required Fields</div>
          </Card.Footer>
        </Card>
      </Form>
    </div>
  );
}

export default Signup;