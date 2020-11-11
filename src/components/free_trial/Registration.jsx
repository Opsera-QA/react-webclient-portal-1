import React, {useContext, useEffect, useState} from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import registrationMetadata from "./freetrial-metadata";
import DtoTextInput from "../common/input/dto_input/dto-text-input";
import Model from "../../core/data_model/model";
import LoadingDialog from "../common/status_notifications/loading";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import userActions from "../user/user-actions";
import RegisterButton from "../common/buttons/saving/RegisterButton";
import PasswordInput from "../common/input/dto_input/PasswordInput";

function FreeTrialSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [registrationDataDto, setRegistrationDataDto] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await setRegistrationDataDto(new Model(registrationMetadata.newObjectFields, registrationMetadata, true));
    setIsLoading(false);
  };

  const loadRegistrationResponse = () => {
    history.push("/registration");
  };

  const createAccount = async () => {
    const isDomainAvailable = await userActions.isDomainAvailable(registrationDataDto.getData("domain"));

    console.log("isDomainAvailable: " + JSON.stringify(isDomainAvailable))

    if (!isDomainAvailable) {
      toastContext.showDomainAlreadyRegisteredErrorDialog();
      return;
    }

    const emailIsAvailable = await userActions.isEmailAvailable(registrationDataDto.getData("email"));

    if (!emailIsAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationDataDto.isModelValid2()) {
      try {
        await userActions.createFreeTrialAccount(registrationDataDto);
        // TODO: Do we want to pop up success toast?
        // toastContext.showCreateSuccessResultDialog("Opsera Account");
        loadRegistrationResponse();
      }
      catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
  };

  if (isLoading || registrationDataDto == null) {
    return <LoadingDialog size="sm"/>;
  }

    return (
      <div className="new-user-signup-form">
        <Form className="m-auto" noValidate onSubmit={e => e.preventDefault()}>
          <Card>
            <Card.Header as="h5" className="new-user-header">Sign Up For Opsera</Card.Header>
            <Card.Body className="new-user-body">
              <div className="signupForm p-2">
                <div className="pr-3 pb-3">
                  <DtoTextInput
                    fieldName={"firstName"}
                    setDataObject={setRegistrationDataDto}
                    dataObject={registrationDataDto}
                  />
                  <DtoTextInput
                    fieldName={"lastName"}
                    setDataObject={setRegistrationDataDto}
                    dataObject={registrationDataDto}
                  />
                  <DtoTextInput
                    fieldName={"email"}
                    setDataObject={setRegistrationDataDto}
                    dataObject={registrationDataDto}
                  />
                  <DtoTextInput
                    fieldName={"company"}
                    setDataObject={setRegistrationDataDto}
                    dataObject={registrationDataDto}
                  />
                  <DtoTextInput
                    fieldName={"domain"}
                    setDataObject={setRegistrationDataDto}
                    dataObject={registrationDataDto}
                  />
                  <DtoTextInput
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
}

export default FreeTrialSignup;
