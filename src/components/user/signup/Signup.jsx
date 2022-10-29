import React, {useContext, useEffect, useState} from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import defaultSignupFormFields from "components/user/signup/signup-form-fields.js";
import "components/user/user.css";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SignupCloudProviderSelectInput
  from "components/common/list_of_values_input/general/SignupCloudProviderSelectInput";
import UsStateSelectInput from "components/common/list_of_values_input/general/UsStateSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";
import AwsCloudProviderRegionSelectInput
  from "components/common/list_of_values_input/aws/regions/AwsCloudProviderRegionSelectInput";

function Signup() {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    setRegistrationDataDto({...
        new Model(
          defaultSignupFormFields.newObjectFields,
          defaultSignupFormFields,
          true,
          )
    });
  }, []);

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    const isDomainAvailable = await userActions.isDomainAvailable(registrationDataDto.getData("domain"));

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    const response = await userActions.isEmailAvailable(
      cancelTokenSource,
      registrationDataDto?.getData("email")
    );
    const isEmailAvailable = response?.data?.emailExists === false;

    if (isEmailAvailable !== true) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationDataDto.isModelValid()) {
      try {
        await userActions.createOpseraAccount(cancelTokenSource, registrationDataDto);
        //toastContext.showCreateSuccessResultDialog("Opsera Account")
        loadRegistrationResponse();
      } catch (error) {
        if (isMounted?.current === true) {
          toastContext.showCreateFailureResultDialog("Opsera Account", error);
        }
      }
    }
  };

  if (registrationDataDto == null) {
    return <LoadingDialog />;
  }

  return (
    <div className="new-user-signup-form mt-2">
      <Form className="full-signup-form m-auto" noValidate onSubmit={e => e.preventDefault()}>
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
          <Card.Body className="new-user-body-full p-3">
            <Row>
              <Col md={6}>
                <TextInputBase fieldName={"firstName"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <TextInputBase fieldName={"lastName"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <TextInputBase fieldName={"email"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <TextInputBase fieldName={"organizationName"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <TextInputBase fieldName={"domain"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <TextInputBase fieldName={"street"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={4}>
                <TextInputBase fieldName={"city"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={4}>
                <UsStateSelectInput fieldName={"state"} model={registrationDataDto} setModel={setRegistrationDataDto} />
              </Col>
              <Col md={4}>
                <TextInputBase fieldName={"zip"} dataObject={registrationDataDto} setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <SignupCloudProviderSelectInput fieldName={"cloudProvider"} model={registrationDataDto} setModel={setRegistrationDataDto} />
              </Col>
              <Col md={6}>
                <AwsCloudProviderRegionSelectInput fieldName={"cloudProviderRegion"} model={registrationDataDto} setModel={setRegistrationDataDto} />
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