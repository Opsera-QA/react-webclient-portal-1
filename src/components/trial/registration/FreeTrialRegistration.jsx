import React, { useContext, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { freeTrialRegistrationMetadata } from "components/trial/freeTrialRegistration.metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import PasswordInput from "components/common/inputs/text/PasswordInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

const FreeTrialRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await setRegistrationDataDto(new Model(freeTrialRegistrationMetadata.newObjectFields, freeTrialRegistrationMetadata, true));
    setIsLoading(false);
  };

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    const isDomainAvailable = await userActions.isDomainAvailable(registrationDataDto.getData("domain"));

    console.log("isDomainAvailable: " + JSON.stringify(isDomainAvailable));

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    const emailIsAvailable = await userActions.isEmailAvailable(registrationDataDto.getData("email"));

    if (!emailIsAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationDataDto.isModelValid()) {
      try {
        await userActions.createFreeTrialAccount(registrationDataDto);
        // TODO: Do we want to pop up success toast?
        // toastContext.showCreateSuccessResultDialog("Opsera Account");
        loadRegistrationResponse();
      } catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
  };

  if (isLoading || registrationDataDto == null) {
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
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <TextInputBase
                  fieldName={"lastName"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <TextInputBase
                  fieldName={"email"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <TextInputBase
                  fieldName={"company"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <TextInputBase
                  fieldName={"domain"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <TextInputBase
                  fieldName={"title"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <PasswordInput
                  fieldName={"password"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
                <PasswordInput
                  fieldName={"confirmPassword"}
                  setDataObject={setRegistrationDataDto}
                  dataObject={registrationDataDto}
                />
              </div>
              <div className="px-2">
                <RegisterButton createAccount={createAccount} recordDto={registrationDataDto} />
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

export default FreeTrialRegistration;
