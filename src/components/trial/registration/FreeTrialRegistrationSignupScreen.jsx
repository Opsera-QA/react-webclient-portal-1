import React from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import PasswordInput from "components/common/inputs/text/PasswordInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PropTypes from "prop-types";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import WizardCardInfoItem from "temp-library-components/wizard/card/info/CardInfoItem";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialRegisterButton from "components/trial/registration/FreeTrialRegisterButton";
import userActions from "components/user/user-actions";

export default function FreeTrialRegistrationSignupScreen (
  {
    registrationModel,
    setRegistrationModel,
    setCurrentScreen,
  }) {
  const { toastContext, isMounted, cancelTokenSource } = useComponentStateReference();

  const registerAccountFunction = async () => {
    const emailIsAvailable = await userActions.isEmailAvailable(registrationModel?.getData("email"));

    if (!emailIsAvailable) {
      toastContext.showEmailAlreadyExistsErrorDialog();
      return;
    }

    if (registrationModel.isModelValid()) {
      try {
        const response = await userActions.createFreeTrialAccount(registrationModel);
        setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.CONGRATULATIONS_SCREEN);
        return response;
      } catch (error) {
        toastContext.showCreateFailureResultDialog("Opsera Account", error);
      }
    }
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
            className={"mt-3"}
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
            {/*<TextInputBase*/}
            {/*  fieldName={"domain"}*/}
            {/*  setDataObject={setRegistrationModel}*/}
            {/*  dataObject={registrationModel}*/}
            {/*/>*/}
            {/*<TextInputBase*/}
            {/*  fieldName={"title"}*/}
            {/*  setDataObject={setRegistrationModel}*/}
            {/*  dataObject={registrationModel}*/}
            {/*/>*/}
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
              <FreeTrialRegisterButton
                registerAccountFunction={registerAccountFunction}
                registrationModel={registrationModel}
              />
            </ButtonContainerBase>
            <RequiredFieldsMessage />
          </div>
        </WizardCard>
      </div>
    </div>
  );
}

FreeTrialRegistrationSignupScreen.propTypes = {
  registrationModel: PropTypes.object,
  setRegistrationModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};
