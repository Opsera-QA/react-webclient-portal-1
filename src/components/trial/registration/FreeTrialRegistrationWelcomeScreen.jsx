import React from "react";
import PropTypes from "prop-types";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCardInfoItem from "temp-library-components/wizard/card/info/CardInfoItem";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import WizardButton from "temp-library-components/wizard/button/WizardButton";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";

// TODO: Standardize styling
const FreeTrialRegistrationWelcomeScreen = ({ setCurrentScreen }) => {
  return (
    <div
      className={"h-100 w-100 d-flex"}
      style={{
        fontFamily: fontThemeConstants.FONT_FAMILIES.MAIN_SITE_FONT_FAMILIES,
      }}
    >
      <div className={"mx-auto"}>
        <FreeTrialSignupHeader />
        <WizardCard
          height={"575px"}
          width={"525px"}
        >
          <div className={"p-4"}>
            <WizardCardInfoItem
              className={"mt-3"}
              title={"Signup"}
              description={"Signup for Free Trial to experience how Opsera can enhance your development process."}
            />
            <WizardCardInfoItem
              className={"mt-3"}
              title={"Select a Pipeline"}
              description={"Select between a Software Development Life Cycle Pipeline and a Salesforce Pipeline."}
            />
            <WizardCardInfoItem
              className={"mt-3"}
              title={"View Analytics"}
              description={"View key insights based on each action you take inside the platform."}
            />
            <div className={"mt-5"}>
              <WizardButton
                onClickFunction={() => setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.SELECT_SIGNUP_OPTION_SCREEN)}
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

FreeTrialRegistrationWelcomeScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationWelcomeScreen;
