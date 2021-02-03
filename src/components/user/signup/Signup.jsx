import React, {useContext, useEffect, useState} from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import defaultSignupFormFields from "components/user/signup/signup-form-fields.js";
import usStateList from "components/user/states";
import "components/user/user.css";
import Model from "core/data_model/model";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import PasswordInput from "components/common/input/dto_input/PasswordInput";

function Signup() {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);
  const [cloudProviderRegions, setCloudProviderRegions] = useState(undefined);

  // TODO: when pulling actual data with react-dropdown, change text to label
  const cloudProviders = [
    { value: "EKS", text: "AWS" },
    // { value: "GKE", text: "GCP" }
  ];
  // const cloudProviderRegions = [{ value: "us-east-2", text: "us-east-2" }];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await searchAWSRegions();
    await setRegistrationDataDto(new Model(defaultSignupFormFields.newObjectFields, defaultSignupFormFields, true));
    setIsLoading(false);
  };

  const searchAWSRegions = async () => {
    try {
      const res = await userActions.getAWSRegions();
      if (typeof(res) != "object") {
        setCloudProviderRegions([{ value: "", text: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "AWS Regions information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        return;
      }
      setCloudProviderRegions(res);
    } catch (error) {
      setCloudProviderRegions([{ value: "", text: "Select One", isDisabled: "yes" }]);
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };
  
  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    // console.log("persistData: ", JSON.stringify(registrationDataDto.getPersistData()));
    const isDomainAvailable = await userActions.isDomainAvailable(registrationDataDto.getData("domain"));

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    const isEmailAvailable = await userActions.isEmailAvailable(registrationDataDto.getData("email"));

    if (!isEmailAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationDataDto.isModelValid2()) {
      try {
        await userActions.createOpseraAccount(registrationDataDto);
        //toastContext.showCreateSuccessResultDialog("Opsera Account")
        loadRegistrationResponse();
      } catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
  };

  if (isLoading || registrationDataDto == null) {
    return <LoadingDialog />
  }

  return (
    <div className="new-user-signup-form">
      <Form className="full-signup-form m-auto" noValidate onSubmit={e => e.preventDefault()}>
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
          <Card.Body className="new-user-body-full p-3">
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
                <PasswordInput fieldName={"password"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <PasswordInput fieldName={"confirmPassword"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
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
                <RegisterButton createAccount={createAccount} recordDto={registrationDataDto}/>
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