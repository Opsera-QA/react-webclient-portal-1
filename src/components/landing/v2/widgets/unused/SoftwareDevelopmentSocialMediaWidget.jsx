import React from "react";
import PropTypes from "prop-types";
import { faLinkedin, faYoutube, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

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

export default function SoftwareDevelopmentSocialMediaWidget({ className }) {
  const handleClick = (url) => e => {
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
        <div className={"marketingModulesText pointer"} style={{ float: "left", bottom: "20px" }}
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


  return (
    <div className={className}>
      <CenteredContentWrapper>
        {getSocialAccountLogo(EXTERNAL_LINKS.YOUTUBE_CHANNEL, SOCIAL_ICONS.YOUTUBE, SOCIAL_ICONS.YOUTUBE_COLOR, SOCIAL_ICONS.YOUTUBE_TOOLTIP)}
        {getSocialAccountLogo(EXTERNAL_LINKS.LINKEDIN, SOCIAL_ICONS.LINKEDIN, SOCIAL_ICONS.LINKEDIN_COLOR, SOCIAL_ICONS.LINKEDIN_TOOLTIP)}
        {getSocialAccountLogo(EXTERNAL_LINKS.TWITTER, SOCIAL_ICONS.TWITTER, SOCIAL_ICONS.TWITTER_COLOR, SOCIAL_ICONS.TWITTER_TOOLTIP)}
        {getSocialAccountLogo(EXTERNAL_LINKS.FACEBOOK, SOCIAL_ICONS.FACEBOOK, SOCIAL_ICONS.FACEBOOK_COLOR, SOCIAL_ICONS.FACEBOOK_TOOLTIP)}
      </CenteredContentWrapper>
    </div>
  );
}

SoftwareDevelopmentSocialMediaWidget.propTypes = {
  className: PropTypes.string,
};