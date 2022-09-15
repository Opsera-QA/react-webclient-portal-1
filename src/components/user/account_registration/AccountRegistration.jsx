import React, {useContext, useEffect, useState} from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "components/user/user.css";
import userActions from "components/user/user-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import accountRegistrationMetadata from "components/user/account_registration/account-registration-metadata";
import TempTextInput from "components/common/inputs/text/TempTextInput";
import {validateEmail} from "utils/helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function AccountRegistration() {
  const { domain } = useParams();
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);
  const [companyName, setCompanyName] = useState("Opsera");
  const [invalidHost, setInvalidHost] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    accessRoleData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setInvalidHost(false);
      const accountResponse = await userActions.getAccountInformationWithDomain(cancelTokenSource, domain);
      let newAccountDto = (new Model(accountRegistrationMetadata.newObjectFields, accountRegistrationMetadata, true));

      if (accountResponse?.data) {
        if (accountResponse.data.idpBaseUrl && window.location.hostname.toLowerCase() !== accountResponse.data.idpBaseUrl.toLowerCase()) {
          setInvalidHost(true);
          toastContext.showSystemErrorBanner("Warning!  You are attempting to create an account on the wrong Opsera Portal tenant.  Please check with your account owner or contact Opsera to get the proper URL register accounts.");
        }
      
        setCompanyName(accountResponse.data?.orgName);
        newAccountDto.setData("company", accountResponse.data?.orgName);
        newAccountDto.setData("ldapOrgAccount", accountResponse.data?.name);
        newAccountDto.setData("ldapOrgDomain", accountResponse.data?.orgDomain);
        newAccountDto.setData("organizationName", accountResponse?.data?.accountName);
        newAccountDto.setData("orgAccount", accountResponse?.data?.name);
        newAccountDto.setData("localAuth", accountResponse?.data?.localAuth === "TRUE");
        newAccountDto.setData("idpIdentifier", accountResponse?.data?.idpIdentifier);

        if (accountResponse?.data?.localAuth === "FALSE" && accountResponse?.data?.idpIdentifier !== "0") {
          if (accessRoleData?.Administrator || accessRoleData?.OpseraAdministrator || accessRoleData?.PowerUser) {
            history.push(`/settings/user-management`);
            history.go(0);
          }
        }
      }

      if (isMounted?.current === true) {
        setRegistrationDataDto(newAccountDto);
      }

    } catch (error) {
      if (!error?.error?.message?.includes(404) && !error?.error?.message?.includes(400)) {
        toastContext.showLoadingErrorDialog(error);
      } else {
        setAccountNotFound(true);
        let newAccountDto = (new Model(accountRegistrationMetadata.newObjectFields, accountRegistrationMetadata, true));
        newAccountDto.setData("company", "Opsera");
        setRegistrationDataDto(newAccountDto);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  // TODO: This check should be moved to register button when updating free trial/standard sign up forms next
  const createAccount = async () => {
    const isEmailAvailable = await userActions.isEmailAvailable(registrationDataDto.getData("email"));

    if (!isEmailAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationDataDto.isModelValid()) {
      try {
        const response = await userActions.createOpseraAccount(cancelTokenSource, registrationDataDto);
        // toastContext.showCreateSuccessResultDialog("Opsera Account")
        loadRegistrationResponse();
      } catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
  };

  const getTitle = () => {
    if (companyName !== "Opsera") {
      return <span>{companyName} Account Registration for Opsera Portal</span>;
    }

    return (<span>Opsera Account Registration</span>);
  };

  const getAccountNotFoundMessage = () => {
    if (accountNotFound) {
      return (
        <div className="w-100 error-block p-2">
          <div><span>Account not found! The link you may have followed could be incorrect or incomplete.</span></div>
        </div>
      );
    }
  };

  if (accountNotFound) {
    return (
      <div className="w-100 error-block top-dialog-block-static-login">
        <div><span>Account not found! The link you may have followed could be incorrect or incomplete.</span></div>
      </div>
    );
  }

  const getWarning = () => {
    const email = registrationDataDto?.getData("email");
    const validEmail = validateEmail(email);

    if (validEmail === true && registrationDataDto?.getData("ldapOrgDomain") !== email.substring(email.lastIndexOf("@") + 1)) {
      return (
        <div className="warning-text pl-4 mt-1">
          Warning, you are about to register an account with an email outside of your organization’s domain.
        </div>
      );
    }
  };

  if (isLoading || registrationDataDto == null) {
    return <LoadingDialog />;
  }

  if (registrationDataDto?.getData("localAuth") === false && registrationDataDto?.getData("idpIdentifier") !== "0") {
    return (
      <div className="new-user-signup-form mt-2">
        <div className="full-signup-form m-auto">
          <Card>
            <Card.Header as="h5" className="new-user-header">{getTitle()}</Card.Header>
            <Card.Body className="new-user-body-full p-3">
              Adding a new User to the account requires account creation on the User Management area in your Opsera Settings.
              Please ask your account owner or delegated administrator to grant you access through the Opsera Portal Settings.
              From there you can complete registration and gain access to the system.
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="new-user-signup-form mt-2">
      <Form className="full-signup-form m-auto" noValidate onSubmit={e => e.preventDefault()}>
        <Card>
          <Card.Header as="h5" className="new-user-header">{getTitle()}</Card.Header>
          <Card.Body className="new-user-body-full p-3">
            {getAccountNotFoundMessage()}
            <Row>
              <Col md={12}>
                <TextInputBase disabled={true} fieldName={"company"} dataObject={registrationDataDto}
                               setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <TextInputBase fieldName={"firstName"} dataObject={registrationDataDto}
                               setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <TextInputBase fieldName={"lastName"} dataObject={registrationDataDto}
                               setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <TempTextInput fieldName={"email"} dataObject={registrationDataDto}
                               setDataObject={setRegistrationDataDto} />
              </Col>
              <Col md={12}>
                <TempTextInput fieldName={"confirmEmail"} dataObject={registrationDataDto}
                               setDataObject={setRegistrationDataDto} />
              </Col>
            </Row>
            {getWarning()}
            <Row>
              <div className="ml-auto m-3 px-3">
                <RegisterButton createAccount={createAccount} recordDto={registrationDataDto} disable={invalidHost} />
              </div>
            </Row>
          </Card.Body>
          <Card.Footer className="new-user-footer">
            <div className="pr-2"><RequiredFieldsMessage /></div>
          </Card.Footer>
        </Card>
      </Form>
    </div>
  );
}

export default AccountRegistration;