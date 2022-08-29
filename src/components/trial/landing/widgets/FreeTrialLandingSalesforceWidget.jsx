import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faLinkedin, faYoutube, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import IconBase from "../../../common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FreeTrialLaunchSalesforceWorkflowWizardOverlay
  from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import { faHandPointer } from "@fortawesome/pro-light-svg-icons";

const EXTERNAL_LINKS = {
  YOUTUBE_CHANNEL: "https://youtube.com/channel/UCJJFTWPkGfK8Kq4nPbNAtaQ",
  LINKEDIN: "https://www.linkedin.com/company/opsera/",
  FACEBOOK: "https://www.facebook.com/opseraio/",
  TWITTER: "https://twitter.com/opseraio",
  SALESFORCE_APPEXCHANGE: "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000PGa51EAD",
};

const SOCIAL_ICONS = {
  YOUTUBE: faYoutube,
  YOUTUBE_COLOR: "#FF0000",
  YOUTUBE_TOOLTIP: "Opsera Youtube Channel",
  LINKEDIN: faLinkedin,
  LINKEDIN_COLOR: "#0072b1",
  LINKEDIN_TOOLTIP: "Opsera on LinkedIn",
  FACEBOOK: faFacebook,
  FACEBOOK_TOOLTIP: "Get Social with Opsera on Facebook",
  FACEBOOK_COLOR: "#3B5998",
  TWITTER: faTwitter,
  TWITTER_COLOR: "#1DA1F2",
  TWITTER_TOOLTIP: "Opsera on Twitter",
};

export default function FreeTrialLandingSalesforceWidget({ className }) {
  const {
    themeConstants,
    userData,
    toastContext,
  } = useComponentStateReference();


  const launchWorkflowCreationWizard = () => {
    toastContext.showOverlayPanel(
      <FreeTrialLaunchSalesforceWorkflowWizardOverlay
      />,
    );
  };


  const handleClick = (url) => e => {
    //window.location.href = url;
    window.open(url, "_blank");
  };

  const getSocialAccountLogo = (url, icon, color, tooltip) => {

    if (!tooltip) {
      tooltip = "Click here.";
    }

    return (
      <TooltipWrapper
        innerText={tooltip}
        placement={"bottom"}
      >
        <div className={"marketingModulesText pointer mx-1"}
             onClick={handleClick(url)}>
          <IconBase
            icon={icon}
            iconSize={"2xl"}
            iconStyling={{
              color: color,
            }}
          />
        </div>
      </TooltipWrapper>
    );
  };

  const getMainSalesforceWidget = () => {
    return (
      <IconCardContainerBase
        className={"focusText"}
        titleBar={
          <div className={"mt-4 mb-3"}>
            <img alt="Get started with Salesforce on Opsera!"
                 src="/img/salesforce/salesforce_logo_white_475x332.png"
                 width="220"
                 height="154"
            />
          </div>
        }
        contentBody={
          <div className={"mb-3 mr-2"}>
            Get started!
          </div>
        }
        onClickFunction={launchWorkflowCreationWizard}
        // className={className}
        tooltip={"Get started with Salesforce on Opsera!"}
        tooltipPosition={"bottom"}
      />
    );
  };

  const getAppExchangeWidget = () => {
    return (
      <IconCardContainerBase
        className={"focusText"}
        contentBody={
          <div className={"d-flex h-100"}>
            <div className={"m-auto"}>
              <span className={"focusText"}>Opsera On</span>
              <img alt="Opsera is available on Salesforce AppExchange!"
                   src="/img/salesforce/salesforce_appexchange_240x80.png"
                   width="240"
                   height="80"
              />
            </div>
          </div>
        }
        onClickFunction={handleClick(EXTERNAL_LINKS.SALESFORCE_APPEXCHANGE)}
        tooltip={"Opsera is available on Salesforce AppExchange!"}
        tooltipPosition={"bottom"}
      />
    );
  };

  return (
    <div className={className} style={{ minHeight: "150px" }}>
      <Row>
        <Col
          xs={12} lg={6}
          className={"my-3"}
          style={{ textAlign: "center" }}
        >
          {getMainSalesforceWidget()}
        </Col>
        <Col
          xs={12} lg={6}
          style={{ textAlign: "center" }}
          className={"my-3"}
        >
          {getAppExchangeWidget()}

          <div className={"w-100 mt-2 pr-1"} >
            <div className={"d-flex flex-row-reverse"}>
              {getSocialAccountLogo(EXTERNAL_LINKS.YOUTUBE_CHANNEL, SOCIAL_ICONS.YOUTUBE, SOCIAL_ICONS.YOUTUBE_COLOR, SOCIAL_ICONS.YOUTUBE_TOOLTIP)}
              {getSocialAccountLogo(EXTERNAL_LINKS.LINKEDIN, SOCIAL_ICONS.LINKEDIN, SOCIAL_ICONS.LINKEDIN_COLOR, SOCIAL_ICONS.LINKEDIN_TOOLTIP)}
              {getSocialAccountLogo(EXTERNAL_LINKS.TWITTER, SOCIAL_ICONS.TWITTER, SOCIAL_ICONS.TWITTER_COLOR, SOCIAL_ICONS.TWITTER_TOOLTIP)}
              {getSocialAccountLogo(EXTERNAL_LINKS.FACEBOOK, SOCIAL_ICONS.FACEBOOK, SOCIAL_ICONS.FACEBOOK_COLOR, SOCIAL_ICONS.FACEBOOK_TOOLTIP)}
            </div>
          </div>
        </Col>
      </Row>


    </div>
  );
}

FreeTrialLandingSalesforceWidget.propTypes = {
  className: PropTypes.string,
};