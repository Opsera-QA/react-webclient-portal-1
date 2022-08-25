import React from "react";
import PropTypes from "prop-types";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCard from "temp-library-components/wizard/card/WizardCard";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
import WizardButton from "temp-library-components/wizard/button/WizardButton";
import { useHistory } from "react-router-dom";

export default function FreeTrialRegistrationCongratulationsScreen() {
  const history = useHistory();

  const routeToLoginScreenButton = () => {
    history.push('/login');
  };

  return (
    <div className={"h-100 w-100 d-flex"}>
      <div className={"mx-auto"}>
        <FreeTrialSignupHeader />
        <WizardCard
          height={"420px"}
          width={"525px"}
          bodyClassName={"p-4 d-flex"}
        >
          <div>
            <div
              style={{
                fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
                fontWeight: 600,
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Congratulations!
            </div>
            <div
              style={{
                fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
                fontWeight: 400,
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              <div className={"mt-3"}>
                You have successfully completed the sign up process!
              </div>
              <div className={"mt-3"}>
                The final step is to verify your account with the email address registered.
              </div>
              <div className={"mt-3"}>
                You will receive a confirmation email that must be completed within 24 hours.
              </div>
              <div className={"mt-3"}>
                After confirming your email you may continue and log in to your new account.
              </div>
            </div>
            <div className={"mt-5"}>
              <WizardButton
                buttonText={"Continue"}
                onClickFunction={routeToLoginScreenButton}
              />
            </div>
          </div>
        </WizardCard>
      </div>
    </div>
  );
}

FreeTrialRegistrationCongratulationsScreen.propTypes = {
  // setCurrentScreen: PropTypes.func,
};