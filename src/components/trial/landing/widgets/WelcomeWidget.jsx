import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { faMessageExclamation } from "@fortawesome/pro-light-svg-icons";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";

export default function WelcomeWidget({ className }) {
  const {
    themeConstants,
    userData,
  } = useComponentStateReference();

  const getWelcomeText = () => {
    const firstNameText = hasStringValue(userData?.firstName) ? `, ${userData.firstName}` : "";
    const welcomeText = `Welcome Back to Opsera Free Trial${firstNameText}!`;

    return (
      <div
        style={{
          // fontWeight: 700,
          // fontSize: "22px",
          // color: themeConstants.COLOR_PALETTE.DEEP_PURPLE,
          // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
        }}
      >
        {welcomeText}
      </div>
    );
  };

  const getHowToLinks = () => {
    return (
      <div>
        <div>How to Link Here</div>
        <div>How to Link Here</div>
        <div>How to Link Here</div>
      </div>
    );
  };

  const getVideo = () => {
    return (
      <div
        className={"ml-3"}
        style={{
          border: `1px solid ${themeConstants.BORDER_COLORS.GRAY}`,
          width: "250px",
          height: "220px",
          backgroundColor: themeConstants.COLOR_PALETTE.WHITE,
          borderRadius: "10px",
          color: themeConstants.COLOR_PALETTE.TEXT_GRAY,
        }}
      >
        <div className={"d-flex h-100 w-100"}>
          <div className={"m-auto"}>
            TODO: Add video
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        title={getWelcomeText()}
        titleIcon={faMessageExclamation}
        fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
        // fontFamily={fontThemeConstants.FONT_FAMILIES.INTER}
        heightSize={6}
      >
        <div className={"p-3"}>
          <div className={"d-flex"}>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Get insights to help make the right decisions.
                Watch the video on how to customise your dashboard
              </div>
              {getHowToLinks()}
            </div>
            <div>
              {getVideo()}
            </div>
          </div>
        </div>
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

WelcomeWidget.propTypes = {
  className: PropTypes.string,
};