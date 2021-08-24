import React, {useContext, useEffect, useState} from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
// import {MarketplaceMeteringClient} from "@aws-sdk/client-marketplace-metering/MarketplaceMeteringClient";

function Signup() {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationModel, setRegistrationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    // const marketplaceMetering = new MarketplaceMeteringClient({ region: "us-east-2"});
    //
    // // x-amzn-marketplace-token
    //
    // const params = {
    //   RegistrationToken: 'STRING_VALUE' // x-amzn-marketplace-token required
    // };
    //
    // marketplaceMetering.resolveCustomer(params, function(error, data) {
    //   if (error) {
    //     console.error(error, error.stack);
    //   }
    //   else {
    //     console.log(data);
    //   }
    // });

    await setRegistrationModel(new Model(awsAccountRegistrationMetadata.newObjectFields, awsAccountRegistrationMetadata, true));
    setIsLoading(false);
  };

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    // console.log("persistData: ", JSON.stringify(registrationDataDto.getPersistData()));
    const isDomainAvailable = await userActions.isDomainAvailable(registrationModel?.getData("domain"));

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    // TODO: We should probably add check for unique customer IDs and throw error if found

    const isEmailAvailable = await userActions.isEmailAvailable(registrationModel?.getData("email"));

    if (!isEmailAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationModel?.isModelValid2()) {
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
    const attributes = registrationModel?.getData("attributes");
    const customerId = attributes?.aws_customer_id;
    const productCode = attributes?.aws_product_code;


    if ((customerId == null || customerId === "") && (productCode == null || productCode === "")) {
      return (
        <div className="warning-text pl-4 mt-1">
          Warning! Did not receive AWS credentials. User registration cannot be completed without these.
        </div>
      );
    }
    else if (customerId == null || customerId === "") {
      return (
        <div className="warning-text pl-4 mt-1">
          Warning! did not receive Customer ID. User registration cannot be completed without this.
        </div>
      );
    }
    else if (productCode == null || productCode === "") {

      return (
      <div className="warning-text pl-4 mt-1">
        Warning! did not receive Product Code. User registration cannot be completed without this.
      </div>
      );
    }
  };

  if (isLoading || registrationModel == null) {
    return <LoadingDialog />;
  }

  return (
    <div className="new-user-signup-form mt-2">
      {getWarning()}
      <Form className="full-signup-form m-auto" noValidate onSubmit={e => e.preventDefault()}>
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
          <Card.Body className="new-user-body-full p-3">
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
                <UsStateSelectInput fieldName={"state"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
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
              <Col md={6}>
                <TextInputBase disabled={true} fieldName={"aws_customer_id"} dataObject={registrationModel} setDataObject={setRegistrationModel} />
              </Col>
            </Row>
            <Row>
              <div className="ml-auto m-3 px-3">
                <RegisterButton createAccount={createAccount} recordDto={registrationModel} disable={getWarning() !== null}/>
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