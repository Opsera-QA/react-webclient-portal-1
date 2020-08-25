import React, {useEffect, useState} from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ApiService } from "api/apiService";
import { useHistory } from "react-router-dom";
import registrationMetadata from "./freetrial-metadata";
import DtoTextInput from "../common/input/dto_input/dto-text-input";
import Model from "../../core/data_model/model";
import LoadingDialog from "../common/status_notifications/loading";
import {getErrorDialog, getFormValidationErrorDialog, getUpdateFailureResultDialog} from "../common/toasts/toasts";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  // TODO: Figure out better way to deal with inner objects, but for now deconstruct and construct before sending
  // attributes: { title: "", company: "" },
  title: "",
  company: "",
};

function FreeTrialSignup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await setRegistrationDataDto(new Model(INITIAL_DATA, registrationMetadata, true));
    setIsLoading(false);
  };

  //Check if the email is already registered in the system
  const isEmailAvailable = async () => {
    const apiCall = new ApiService("/users/check-email", {}, null, { email: registrationDataDto.getData("email") });
    return await apiCall.post()
      .then(function (response) {
        if (response.data) {
          return false;
        }
        else {
          return true;
        }
      })
      .catch(function (error) {
        return true;
      });
  };

  const loadRegistrationResponse = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/registration");
  };

  //Final form submit
  const signupSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (registrationDataDto.getData("email").length === 0) {
      let toast = getErrorDialog("You did not enter an email address.", setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      return;
    }
    //Check if the email is already exist in the system
    const emailIsAvailable = await isEmailAvailable();

    if (!emailIsAvailable) {
      let toast = getErrorDialog("Email address already exists.", setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
    else if (registrationDataDto.isModelValid()) {
      let finalObject = registrationDataDto.getPersistData();
      let attributes = { title: registrationDataDto.getData("title"), company: registrationDataDto.getData("company")};
      let configuration = { cloudProvider: "EKS", cloudProviderRegion: "us-east-2"};
      delete finalObject["title"];
      delete finalObject["company"];
      finalObject["attributes"] = attributes;
      finalObject["configuration"] = configuration;
      finalObject["domain"] = "freetrial";
      finalObject["organizationName"] = "freeTrial";

      setIsLoading(true);
      const apiCall = new ApiService("/users/create", {}, null, finalObject);
      await apiCall.post()
        .then(function (response) {
          console.debug(response);
          setIsLoading(false);
          loadRegistrationResponse();
        })
        .catch(function (error) {
          let toast = getUpdateFailureResultDialog("Tag", error.message, setShowToast, "detailPanelTop");
          setToast(toast);
          setShowToast(true);
          console.error(error.message);
          setIsLoading(false);
        });
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  if (isLoading || registrationDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <div className="new-user-signup-form">
        <Form className="m-auto" noValidate onSubmit={signupSubmit}>
          <Card>
            <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
            <Card.Body className="new-user-body">
              {showToast && toast}
              <div className="signupForm p-2">
                <div className="pr-3 pb-3">
                  <DtoTextInput fieldName={"firstName"} setDataObject={setRegistrationDataDto}
                                dataObject={registrationDataDto}/>
                  <DtoTextInput fieldName={"lastName"} setDataObject={setRegistrationDataDto}
                                dataObject={registrationDataDto}/>
                  <DtoTextInput fieldName={"email"} setDataObject={setRegistrationDataDto}
                                dataObject={registrationDataDto}/>
                  <DtoTextInput fieldName={"company"} setDataObject={setRegistrationDataDto}
                                dataObject={registrationDataDto}/>
                  <DtoTextInput fieldName={"title"} setDataObject={setRegistrationDataDto}
                                dataObject={registrationDataDto}/>
                  <DtoTextInput fieldName={"password"} setDataObject={setRegistrationDataDto} type={"password"}
                                dataObject={registrationDataDto}/>
                  <DtoTextInput fieldName={"confirmPassword"} setDataObject={setRegistrationDataDto} type={"password"}
                                dataObject={registrationDataDto}/>
                </div>
                <div className="px-2">
                  {isLoading ?
                    <Button id="login-button" disabled={true} variant="outline-success" className="mr-2 px-4"
                            type="button"><span>Working...</span></Button> :
                    <Button size="md" className="register-button mx-auto" id="login-button" type="submit"
                            variant="success"><span>Register Account</span></Button>
                  }
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="new-user-footer">
              <div className="text-muted text-right pr-2"><span className="danger-red">*</span> Required Fields</div>
            </Card.Footer>
          </Card>
        </Form>
      </div>
    );
  }
}

export default FreeTrialSignup;