import React from "react";
import PropTypes from "prop-types";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import WizardSelectionOption from "temp-library-components/wizard/option/WizardSelectionOption";
import { faGithub, faGitlab, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import WizardCardInfoItem from "temp-library-components/wizard/card/info/CardInfoItem";

const SIGNUP_OPTIONS = {
  GITLAB: "gitlab",
  GITHUB: "github",
  LINKED_IN: "linked_in",
  OPSERA: "opsera",
};

const FreeTrialRegistrationSelectSignupOptionScreen = ({ setCurrentScreen}) => {
  const handleSelection = (selectedOption) => {
    switch (selectedOption) {
      case SIGNUP_OPTIONS.GITHUB:
      case SIGNUP_OPTIONS.GITLAB:
      case SIGNUP_OPTIONS.LINKED_IN:
        throw "Not supported yet";
      case SIGNUP_OPTIONS.OPSERA:
      default:
        setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.SIGNUP_SCREEN);
    }
  };

  return (
    <div className={"h-100 w-100 d-flex"}>
      <div className={"mx-auto"}>
        <FreeTrialSignupHeader />
        <WizardCard>
          <div className={"p-4"}>
            <WizardCardInfoItem
              title={"Signup"}
              description={"Signup for Free Trial to experience how Opsera can enhance your development process."}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faUser}
              text={"Sign Up with Username"}
            />
            <div>Make OR line</div>
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faGitlab}
              text={"Gitlab"}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faGithub}
              text={"Github"}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faLinkedin}
              text={"LinkedIn"}
            />
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
