import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { faMessageExclamation } from "@fortawesome/pro-light-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import IconBase from "../../../common/icons/IconBase";

const EXTERNAL_LINKS = {
  HOW_TO_VIDEO: 'https://www.youtube.com/embed/vT6XXPbZBuo'
};

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

  //For wider screens return the video as a thumbnail
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

  //For wider screens return the video as a thumbnail
  const getVideoThumb = () => {
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
            <iframe width="250" height="220" src="https://www.youtube.com/embed/vT6XXPbZBuo"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
        </div>
      </div>
    );
  };


  //for narrow screens return just a link
  const getVideoLink = () => {

    const handleClick = (url) => e => {
      //window.location.href = url;
      window.open(url, '_blank');
    };

      return (
      <div className={"marketingModulesText pointer"}
        onClick={handleClick(EXTERNAL_LINKS.HOW_TO_VIDEO)}>
        <IconBase
          icon={faYoutube}
          iconSize={"lg"}
          iconStyling={{
            color: themeConstants.COLOR_PALETTE.RED,
          }}
        /> {EXTERNAL_LINKS.HOW_TO_VIDEO}
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
            <div className={"d-none d-xl-inline"}>
              {getVideoThumb()}
            </div>
          </div>

          <div className={"d-inline d-xl-none"}>
            {getVideoLink()}
          </div>
        </div>
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

WelcomeWidget.propTypes = {
  className: PropTypes.string,
};