import React from "react";
import PropTypes from "prop-types";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import WizardSelectionOption, {
  SUPPORTED_WIZARD_SELECTION_OPTION_TYPES,
} from "temp-library-components/wizard/option/WizardSelectionOption";
import { faGithub, faGitlab, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import WizardCardInfoItem from "temp-library-components/wizard/card/info/CardInfoItem";
import { DividerWithCenteredText } from "temp-library-components/divider/DividerWithCenteredText";

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
        <WizardCard
          height={"575px"}
          width={"525px"}
        >
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
              type={SUPPORTED_WIZARD_SELECTION_OPTION_TYPES.PRIMARY}
              option={SIGNUP_OPTIONS.OPSERA}
            />
            <DividerWithCenteredText text={"OR"} className={"my-3 mx-3"} />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faGithub}
              text={"Github"}
              option={SIGNUP_OPTIONS.GITHUB}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faGitlab}
              text={"Gitlab"}
              option={SIGNUP_OPTIONS.GITLAB}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faLinkedin}
              text={"LinkedIn"}
              option={SIGNUP_OPTIONS.LINKED_IN}
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
