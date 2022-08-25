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
    const welcomeText = `Hello ${firstNameText}!`;

    return (
      <div>
        {welcomeText}
      </div>
    );
  };

  const getHowToLinks = () => {
    return (
      <div className={"marketingModulesText"}>
        <div className={"my-2"}>How to Link Here</div>
        <div className={"my-2"}>More how to Links Here</div>
        <div className={"my-2"}>Even more how to Links Here</div>
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
              <div className={"marketingModulesText"}>
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