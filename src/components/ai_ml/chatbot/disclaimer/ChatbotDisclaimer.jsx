import React from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { faWarning } from "@fortawesome/pro-light-svg-icons";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import DisclaimerContainer from "./DisclaimerContainer";

function ChatbotDisclaimer({
  showPanel,
  closePanel,
  isLoading,
  className,
  titleIcon,
  title,
}) {
  const getChatbotDisclaimer = () => {
    return (
      <DisclaimerContainer
        isLoading={isLoading}
        title={title}
      >
        <div>
          Opsera AI Tools may occasionally produce inaccurate information about
          people, places, or facts.
          <div className={"mt-2"}>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <b></b>
              </li>
            </ul>
          </div>
        </div>
      </DisclaimerContainer>
    );
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={showPanel}
      isLoading={isLoading}
      titleIcon={titleIcon}
      titleText={`Disclaimer`}
    >
      <div className={className}>{getChatbotDisclaimer()}</div>
    </CenterOverlayContainer>
  );
}

ChatbotDisclaimer.propTypes = {
  showPanel: PropTypes.bool,
  closePanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  title: PropTypes.string,
};

ChatbotDisclaimer.defaultProps = {
  className: "p-2 help-body",
  titleIcon: faWarning,
  titleText: "Help",
};

export default ChatbotDisclaimer;
