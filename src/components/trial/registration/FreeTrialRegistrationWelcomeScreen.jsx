import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { FREE_TRIAL_REGISTRATION_SCREENS } from "components/trial/registration/FreeTrialRegistration";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";

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
            width: "525px",
            borderRadius: "24px",
          }}
          className={"mt-2"}
        >
          <div
            className={"mx-auto"}
            style={{
              width: "450px",
              height: "5px",
              backgroundColor: themeConstants.COLOR_PALETTE.BLUE_HIGHLIGHT,
              borderRadius: "2px",
            }}
          />
          <div className={"p-4"}>
            <div className={"d-flex"}>
              <h4 className={"mx-auto"}>Signup</h4>
            </div>
            <div
              style={{
                color: themeConstants.COLOR_PALETTE.TEXT_GRAY,
                fontSize: "16px",
                fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Signup for Free Trial to understand how Opsera can enhance your development process.
            </div>
            <div className={"mt-3"}>
              <div className={"d-flex"}>
                <h4 className={"mx-auto"}>Select a Pipeline</h4>
              </div>
              <div
                style={{
                  color: themeConstants.COLOR_PALETTE.TEXT_GRAY,
                  fontSize: "16px",
                  fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                Select between a Software Development Life Cycle Pipeline and a Salesforce Pipeline.
              </div>
            </div>
            <div className={"mt-3"}>
              <div className={"d-flex"}>
                <h4 className={"mx-auto"}>View Analytics</h4>
              </div>
              <div
                style={{
                  color: themeConstants.COLOR_PALETTE.TEXT_GRAY,
                  fontSize: "16px",
                  fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                View key insights based on each action you take inside the platform.
              </div>
            </div>
            <div className={"mt-5"}>
              <div
                style={{
                  backgroundColor: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
                  borderRadius: "2em",
                  color: themeConstants.COLOR_PALETTE.WHITE,
                  width: "225px",
                  fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
                  fontWeight: 400,
                  fontSize: "18px",
                }}
                className={"mx-auto pointer d-flex"}
                onClick={() => setCurrentScreen(FREE_TRIAL_REGISTRATION_SCREENS.SELECT_SIGNUP_OPTION_SCREEN)}
              >
                <div className={"p-2 m-auto"}>Get Started</div>
              </div>
              <div className={"d-flex mt-2"}>
                <span className={"mx-auto "}>Learn More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FreeTrialRegistrationWelcomeScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};

export default FreeTrialRegistrationWelcomeScreen;
