import React from "react";
import PropTypes from "prop-types";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import WizardSelectionOption from "temp-library-components/wizard/option/WizardSelectionOption";
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

export default function FreeTrialRegistrationSelectSignupOptionScreen({ setCurrentScreen }) {
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
          width={"525px"}
        >
          <div className={"px-4 py-3"}>
            <div className={"mt-2 mb-5 w-100"} style={{textAlign: "center"}}>
              <img
                alt={"Opsera Inc."}
                src={"/img/logos/opsera_bird_transparent_158x120.png"}
                width={"158"}
                height={"120"}
              />
            </div>

            <WizardCardInfoItem
              // title={"Signup"}
              // description={"Sign up for Free Trial to experience how Opsera can enhance your development process."}
              description={"Choose the sign in method to use."}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-3"}
              icon={faUser}
              text={"Sign in with Email Address"}
              option={SIGNUP_OPTIONS.OPSERA}
            />
            <DividerWithCenteredText text={"OR"} className={"m-4"} />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-4"}
              icon={faGithub}
              text={"Github"}
              option={SIGNUP_OPTIONS.GITHUB}
              disabled={true}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-4"}
              icon={faGitlab}
              text={"Gitlab"}
              option={SIGNUP_OPTIONS.GITLAB}
              disabled={true}
            />
            <WizardSelectionOption
              onClickFunction={handleSelection}
              className={"mt-4"}
              icon={faLinkedin}
              text={"LinkedIn"}
              option={SIGNUP_OPTIONS.LINKED_IN}
              disabled={true}
            />
          </div>
        </WizardCard>
      </div>
    </div>
  )
    ;
}

FreeTrialRegistrationSelectSignupOptionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};
