import React, {useContext} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import IconBase from "components/common/icons/IconBase";
import { ExternalLink } from "temp-library-components/link/ExternalLink";
import FreetrialWizardHelpDocumentation
from "../../../common/help/documentation/freetrial/FreetrialWizardHelpDocumentation";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {EXTERNAL_LINKS} from "assets/links/externalLinks";

export default function WelcomeWidget({ className }) {
  const {
    themeConstants,
    userData,
    toastContext,
  } = useComponentStateReference();

  const getWelcomeText = () => {
    const welcomeText = hasStringValue(userData?.firstName) === true ? `Hello ${userData?.firstName}` : "Hello";
    // const welcomeText = `Hello ${userData.firstName}!`;

    return (
      <div>
        {welcomeText}
      </div>
    );
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const toggleVideosView = () => {
    toastContext.showOverlayPanel(
      <CenterOverlayContainer
        closePanel={closePanel}
        titleText={"Getting Started Videos"}
        // titleIcon={titleIcon}
      >
        <FreetrialWizardHelpDocumentation/>
      </CenterOverlayContainer>
    );
  };

  const getHowToLinks = () => {
    return (
      <div className={"d-flex"}>
        <div className={"mt-auto"}>
          <div className={"mt-2"}>
            <ExternalLink
              link={EXTERNAL_LINKS.SALESFORCE_RELEASE_MANAGEMENT}
              label={"Salesforce Release Management"}
            />
          </div>
          <div className={"my-2"}>
            <ExternalLink
              link={EXTERNAL_LINKS.SALESFORCE_USER_GUIDE}
              label={"Salesforce User Guide"}
            />
          </div>
          <div className={"my-2"}>
            <a className={"externalLink"} onClick={toggleVideosView} href="#">
              Getting Started Videos
            </a>
          </div>
        </div>
      </div>
    );
  };

  const getVideoThumbnail = () => {
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
            <iframe width="250" height="220" src="https://www.youtube.com/embed/8oeBwmapAHU"
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    );
  };

  const getVideoLink = () => {
    const handleClick = (url) => e => {
      window.open(url, "_blank");
    };

    return (
      <div className={"pointer"}
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
    <FreeTrialWidgetDataBlockBase
      title={getWelcomeText()}
      className={className}
      fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
      heightSize={6}
    >
      <div className={"p-3 marketingModulesText"}>
        <div className={"d-flex"}>
          <div>
            <div className={"mb-2"}>
              <div>Welcome to the Opsera Salesforce trial platform.</div>
              <div className={"mt-2"}>You can use this 14 day demo to learn more about the Salesforce offerings from Opsera.</div>
            </div>
            {getHowToLinks()}
          </div>
          <div className={"d-none d-md-inline"}>
            {getVideoThumbnail()}
          </div>
        </div>
        <div className={"d-inline d-md-none"}>
          {getVideoLink()}
        </div>
      </div>
    </FreeTrialWidgetDataBlockBase>
  );
}

WelcomeWidget.propTypes = {
  className: PropTypes.string,
};