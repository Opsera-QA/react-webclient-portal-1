import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import HelpDocumentation from "components/common/help/overlay/HelpDocumentation";
import {DialogToastContext} from "contexts/DialogToastContext";

function HelpDocumentationOverlay({ initialView }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Help`}
      titleIcon={faQuestionCircle}
    >
      <div className={"p-3"}>
        <HelpDocumentation initialView={initialView} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

HelpDocumentationOverlay.propTypes = {
  initialView: PropTypes.string,
};

export default HelpDocumentationOverlay;