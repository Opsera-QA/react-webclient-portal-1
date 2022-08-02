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
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import WizardCardInfoItem from "temp-library-components/wizard/card/info/CardInfoItem";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import useComponentStateReference from "hooks/useComponentStateReference";

const FreeTrialRegistrationSignupScreen = (
  {
    registrationModel,
    setRegistrationModel,
    setCurrentScreen,
  }) => {
  const { toastContext, isMounted, cancelTokenSource } = useComponentStateReference();

  // TODO: Wire up user creation. Ensure cancelToken is used
  const createAccount = async () => {
    // const isDomainAvailable = await userActions.isDomainAvailable(registrationModel.getData("domain"));
    //
    // if (!isDomainAvailable) {
    //   toastContext.showDomainAlreadyRegisteredErrorDialog();
    //   return;
    // }
    //
    // const emailIsAvailable = await userActions.isEmailAvailable(registrationModel.getData("email"));
    //
    // if (!emailIsAvailable) {
    //   toastContext.showEmailAlreadyExistsErrorDialog();
    //   return;
    // }
    //
    // if (registrationModel.isModelValid()) {
    //   try {
    //     await userActions.createFreeTrialAccount(registrationModel);
    //     // TODO: Do we want to pop up success toast?
    //     // toastContext.showCreateSuccessResultDialog("Opsera Account");
    setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.CONGRATULATIONS_SCREEN);
    //   } catch (error) {
    //     toastContext.showCreateFailureResultDialog("Opsera Account", error);
    //   }
    // }
  };

  if (registrationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div className={"h-100 w-100 d-flex"}>
      <div className={"mx-auto"}>
        <FreeTrialSignupHeader />
        <WizardCard
          height={"900px"}
          width={"825px"}
        >
          {toastContext?.getInlineBanner()}
          <WizardCardInfoItem
            title={"Signup"}
            description={"Signup for Free Trial to experience how Opsera can enhance your development process."}
          />
          <div className={"p-3"}>
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
            <ButtonContainerBase>
              <RegisterButton
                createAccount={createAccount}
                recordDto={registrationModel}
              />
            </ButtonContainerBase>
            <RequiredFieldsMessage />
          </div>
        </WizardCard>
      </div>
    </div>
  );
};

FreeTrialRegistrationSignupScreen.propTypes = {
  registrationModel: PropTypes.object,
  setRegistrationModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationSignupScreen;
