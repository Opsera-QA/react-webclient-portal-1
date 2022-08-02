import React from "react";
import PropTypes from "prop-types";
import FreeTrialSignupHeader from "temp-library-components/header/FreeTrialSignupHeader";
import WizardCard from "temp-library-components/wizard/card/WizardCard";

const FreeTrialRegistrationCongratulationsScreen = () => {
  return (
    <div className={"h-100 w-100 d-flex"}>
      <div className={"mx-auto"}>
        <FreeTrialSignupHeader />
        <WizardCard
          height={"575px"}
          width={"525px"}
        >
          <div className={"p-4"}>
            Congo rats!
          </div>
        </WizardCard>
      </div>
    </div>
  );
};

FreeTrialRegistrationCongratulationsScreen.propTypes = {
  // setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationCongratulationsScreen;
