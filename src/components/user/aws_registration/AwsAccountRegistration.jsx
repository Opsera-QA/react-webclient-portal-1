import React, {useContext, useEffect, useState} from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import "components/user/user.css";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import awsAccountRegistrationMetadata from "components/user/aws_registration/aws_account_registration_metadata";
import SignupCloudProviderSelectInput
  from "components/common/list_of_values_input/general/SignupCloudProviderSelectInput";
import UsStateSelectInput from "components/common/list_of_values_input/general/UsStateSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function AwsAccountRegistration() {
  const { customerId } = useParams();
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationModel, setRegistrationModel] = useState(undefined);
  const {
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let newModel = new Model(awsAccountRegistrationMetadata.newObjectFields, awsAccountRegistrationMetadata, true);
    newModel.setData("aws_customer_id", customerId);
    await setRegistrationModel({...newModel});
    setIsLoading(false);
  };

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    const isDomainAvailable = await userActions.isDomainAvailable(registrationModel?.getData("domain"));

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    // TODO: We should probably add check for unique customer IDs and throw error if found

    const response = await userActions.isEmailAvailable(
      cancelTokenSource,
      registrationModel?.getData("email")
    );
    const isEmailAvailable = response?.data?.emailExists === false;

    if (!isEmailAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationModel?.isModelValid()) {
      try {
        await userActions.createAwsMarketplaceOpseraAccount(registrationModel);
        //toastContext.showCreateSuccessResultDialog("Opsera Account")
        loadRegistrationResponse();
      } catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
  };

  const getWarning = () => {
    if ((customerId == null || customerId === "")) {
      return (
        <div className="warning-text pl-4 mt-1">
          Warning! Did not receive AWS credentials. User registration cannot be completed without these.
        </div>
      );
    }
  };

  if (isLoading || registrationModel == null) {
    return <LoadingDialog />;
  }

  return (
    <div className="new-user-signup-form mt-2">
      <Form className="full-signup-form m-auto" noValidate onSubmit={e => e.preventDefault()}>
        <Card>
          <Card.Header as="h5" className="new-aws-marketplace-user-header">AWS Marketplace Opsera Registration</Card.Header>
          <Card.Body className="new-user-body-full p-3">
            {getWarning()}
            <Row>
              <Col md={6}>
                <TextInputBase fieldName={"firstName"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={6}>
                <TextInputBase fieldName={"lastName"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={12}>
                <TextInputBase fieldName={"email"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={6}>
                <TextInputBase fieldName={"organizationName"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={6}>
                <TextInputBase fieldName={"domain"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={12}>
                <TextInputBase fieldName={"street"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={4}>
                <TextInputBase fieldName={"city"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={4}>
                <UsStateSelectInput fieldName={"state"} model={registrationModel} setModel={setRegistrationModel} />
              </Col>
              <Col md={4}>
                <TextInputBase fieldName={"zip"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
              <Col md={6}>
                <SignupCloudProviderSelectInput disabled={true} fieldName={"cloudProvider"} model={registrationModel} setModel={setRegistrationModel} />
              </Col>
              <Col md={6}>
                <TextInputBase disabled={true} fieldName={"cloudProviderRegion"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
            </Row>
            <Row>
              <div className="ml-auto m-3 px-3">
                <RegisterButton createAccount={createAccount} recordDto={registrationModel} />
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

export default AwsAccountRegistration;