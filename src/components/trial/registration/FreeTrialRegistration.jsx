import React, { useEffect, useState } from "react";
import { freeTrialRegistrationMetadata } from "components/trial/freeTrialRegistration.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import FreeTrialRegistrationWelcomeScreen from "components/trial/registration/FreeTrialRegistrationWelcomeScreen";
import FreeTrialRegistrationSignupScreen from "components/trial/registration/FreeTrialRegistrationSignupScreen";
import FreeTrialRegistrationSelectSignupOptionScreen
  from "components/trial/registration/FreeTrialRegistrationSelectSignupOptionScreen";

export const FREE_TRIAL_REGISTRATION_SCREENS = {
  WELCOME_SCREEN: "welcome",
  SELECT_SIGNUP_OPTION_SCREEN: "signup_options",
  SIGNUP_SCREEN: "signup",
  CONGRATULATIONS_SCREEN: "congratulations",
};

const FreeTrialRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(FREE_TRIAL_REGISTRATION_SCREENS.WELCOME_SCREEN);
  const [registrationModel, setRegistrationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setRegistrationModel({...modelHelpers.getNewModelForMetadata(freeTrialRegistrationMetadata)});
    setIsLoading(false);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case FREE_TRIAL_REGISTRATION_SCREENS.WELCOME_SCREEN:
        return (
          <FreeTrialRegistrationWelcomeScreen
            setCurrentScreen={setCurrentScreen}
          />
        );
      case FREE_TRIAL_REGISTRATION_SCREENS.SELECT_SIGNUP_OPTION_SCREEN:
        return (
          <FreeTrialRegistrationSelectSignupOptionScreen
            setCurrentScreen={setCurrentScreen}
          />
        );
      case FREE_TRIAL_REGISTRATION_SCREENS.SIGNUP_SCREEN:
        return (
          <FreeTrialRegistrationSignupScreen
            registrationModel={registrationModel}
            setRegistrationModel={setRegistrationModel}
          />
        );
      case FREE_TRIAL_REGISTRATION_SCREENS.CONGRATULATIONS_SCREEN:
        return (
          <FreeTrialRegistrationSignupScreen
            registrationModel={registrationModel}
            setRegistrationModel={setRegistrationModel}
          />
        );
    }
  };

  if (isLoading || registrationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div>
      {getCurrentScreen()}
    </div>
  );
};

export default FreeTrialRegistration;
