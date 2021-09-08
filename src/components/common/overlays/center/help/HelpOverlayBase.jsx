import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function HelpOverlayBase({ helpDocumentation, children, showPanel, closePanel, isLoading, className, titleIcon, helpTopic}) {
  const getHelpDocumentationContainer = () => {
    if (helpDocumentation != null) {
      return (
        <HelpDocumentationContainer
          isLoading={isLoading}
          helpTopic={helpTopic}
        >
          {helpDocumentation}
        </HelpDocumentationContainer>
      );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={showPanel}
      isLoading={isLoading}
      titleIcon={titleIcon}
      titleText={`Help`}
    >
      <div className={className}>
        {getHelpDocumentationContainer()}
        {children}
      </div>
    </CenterOverlayContainer>
  );
}

HelpOverlayBase.propTypes = {
  children: PropTypes.any,
  showPanel: PropTypes.bool,
  closePanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  helpTopic: PropTypes.string,
  helpDocumentation: PropTypes.any,
};

HelpOverlayBase.defaultProps = {
  className: "p-2 help-body",
  titleIcon: faQuestionCircle,
  titleText: "Help"
};

export default HelpOverlayBase;


