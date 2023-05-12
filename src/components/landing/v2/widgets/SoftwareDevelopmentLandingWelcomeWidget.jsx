import React, {useContext} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { ExternalLink } from "temp-library-components/link/ExternalLink";
import FreetrialWizardHelpDocumentation
    from "../../../common/help/documentation/freetrial/FreetrialWizardHelpDocumentation";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {EXTERNAL_LINKS} from "components/header/legacy/HeaderNavBar";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import {platformImageConstants} from "temp-library-components/image/platformImage.constants";
import {ImageBase} from "@opsera/react-vanity-set";
import {Link} from "react-router-dom";

export default function SoftwareDevelopmentLandingWelcomeWidget({ className }) {
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

  return (
    <WidgetDataBlockBase
      title={getWelcomeText()}
      className={className}
      heightSize={6}
    >
      <div className={"px-3 pb-2 marketingModulesText"}>
        <div className={"d-flex"}>
          <div>
            <div className={"pt-2"}>
              <div>Welcome to the Opsera DevOps Platform.</div>
              <div className={"mt-2"}>To get started, review helpful links below or start engaging with your workflows below.</div>
            </div>
            <div className={"mt-3"}>
              <ExternalLink
                link={EXTERNAL_LINKS.FREQUENTLY_ASKED_QUESTIONS}
                label={"Frequently Asked Questions"}
              />
            </div>
            <div className={"my-2"}>
              <ExternalLink
                link={EXTERNAL_LINKS.KNOWLEDGE_BASE}
                label={"Getting Started"}
              />
            </div>
            <div className={"my-2"}>
              <ExternalLink
                link={EXTERNAL_LINKS.HOW_TO_ARTICLES}
                label={"How To"}
              />
            </div>
            <div className={"my-2"}>
              <ExternalLink
                link={EXTERNAL_LINKS.RELEASE_NOTES}
                label={"Release Notes"}
              />
            </div>
          </div>
          <div className={"d-none d-md-inline ml-3"}>
            <div className={"mt-auto"}>
              <ImageBase
                height={235}
                imageSource={platformImageConstants.PLATFORM_IMAGE_LINKS.COLLABORATION}
              />
            </div>
          </div>
        </div>
      </div>
    </WidgetDataBlockBase>
  );
}

SoftwareDevelopmentLandingWelcomeWidget.propTypes = {
  className: PropTypes.string,
};
