import React from "react";
import PropTypes from "prop-types";

const FreeTrialRegistrationWelcomeScreen = ({ setCurrentScreen }) => {
  return (
    <div>
      <img
        alt={"Opsera Inc."}
        src={"/img/logos/opsera-logo-temp.png"}
        width={"148"}
        height={"78"}
        className={"d-inline-block align-top mx-3"}
      />
      WELCOME
    </div>
  );
};

FreeTrialRegistrationWelcomeScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationWelcomeScreen;
