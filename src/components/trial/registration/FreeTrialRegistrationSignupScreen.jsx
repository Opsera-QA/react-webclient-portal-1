import React, { useContext, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { freeTrialRegistrationMetadata } from "components/trial/freeTrialRegistration.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import PasswordInput from "components/common/inputs/text/PasswordInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import PropTypes from "prop-types";
import FreeTrialRegistrationWelcomeScreen from "components/trial/registration/FreeTrialRegistrationWelcomeScreen";

const FreeTrialRegistrationSignupScreen = ({ registrationModel, setRegistrationModel}) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    const isDomainAvailable = await userActions.isDomainAvailable(registrationModel.getData("domain"));

    console.log("isDomainAvailable: " + JSON.stringify(isDomainAvailable));

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    const emailIsAvailable = await userActions.isEmailAvailable(registrationModel.getData("email"));

    if (!emailIsAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationModel.isModelValid()) {
      try {
        await userActions.createFreeTrialAccount(registrationModel);
        // TODO: Do we want to pop up success toast?
        // toastContext.showCreateSuccessResultDialog("Opsera Account");
        loadRegistrationResponse();
      } catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
  };

  if (isLoading || registrationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div className="new-user-signup-form mt-2">
      <Form className="m-auto" noValidate onSubmit={e => e.preventDefault()}>
        <Card>
          <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
          <Card.Body className="new-user-body">
            <div className="signupForm p-2">
              <div className="pr-3 pb-3">
                <TextInputBase
                  fieldName={"firstName"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <TextInputBase
                  fieldName={"lastName"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <TextInputBase
                  fieldName={"email"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <TextInputBase
                  fieldName={"company"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <TextInputBase
                  fieldName={"domain"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <TextInputBase
                  fieldName={"title"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <PasswordInput
                  fieldName={"password"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
                <PasswordInput
                  fieldName={"confirmPassword"}
                  setDataObject={setRegistrationModel}
                  dataObject={registrationModel}
                />
              </div>
              <div className="px-2">
                <RegisterButton createAccount={createAccount} recordDto={registrationModel} />
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="new-user-footer">
            <div className="text-muted text-right pr-2">
              <span><span className="danger-red">*</span> Required Fields</span>
            </div>
          </Card.Footer>
        </Card>
      </Form>
    </div>
  );
};

FreeTrialRegistrationSignupScreen.propTypes = {
  registrationModel: PropTypes.object,
  setRegistrationModel: PropTypes.func,
};

export default FreeTrialRegistrationSignupScreen;
