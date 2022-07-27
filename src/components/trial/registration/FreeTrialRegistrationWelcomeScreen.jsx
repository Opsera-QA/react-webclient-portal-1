import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Standardize styling
const FreeTrialRegistrationWelcomeScreen = ({ setCurrentScreen }) => {
  const { themeConstants } = useComponentStateReference();
  return (
    <div className={"h-100 w-100 d-flex"}>
      <div className={"mx-auto"}>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <img
            alt={"Opsera Inc."}
            src={"/img/logos/opsera-logo-temp.png"}
            width={"148"}
            height={"78"}
          />
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: 700,
            fontFamily: "Inter",
            textAlign: "center",
          }}
        >
          Welcome to Opsera
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "Inter",
            textAlign: "center",
          }}
        >
          Free Trial Experience
        </div>

        <div
          style={{
            backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
            minHeight: "575px",
            height: "575px",
            maxHeight: "575px",
          }}
        >
        </div>
      </div>
    </div>
  );
};

FreeTrialRegistrationWelcomeScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationWelcomeScreen;
