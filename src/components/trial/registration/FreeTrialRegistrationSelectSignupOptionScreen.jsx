import React from "react";
import PropTypes from "prop-types";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import WizardButton from "temp-library-components/wizard/button/WizardButton";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import WizardSelectionOption from "temp-library-components/wizard/option/WizardSelectionOption";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";

const FreeTrialRegistrationSelectSignupOptionScreen = ({ setCurrentScreen}) => {
  return (
    <div className={"h-100 w-100 d-flex"}>
      <div className={"mx-auto"}>
        <FreeTrialSignupHeader />
        <WizardCard>
          <div className={"p-4"}>
            <WizardSelectionOption
              onClickFunction={() => setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.SIGNUP_SCREEN)}
              className={"mt-3"}
              icon={faGitlab}
              text={"Select a method to sigin in to the free trial experience ."}
            />
            <div className={"mt-5"}>
              <WizardButton
                onClickFunction={() => setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.SIGNUP_SCREEN)}
                buttonText={"Get Started"}
              />
              <div className={"d-flex mt-2"}>
                <span className={"mx-auto "}>Learn More</span>
              </div>
            </div>
          </div>
        </WizardCard>
      </div>
    </div>
  );
};

FreeTrialRegistrationSelectSignupOptionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationSelectSignupOptionScreen;
