import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ApigeePipelineRunAssistant
  from "components/workflow/run_assistants/apigee/ApigeePipelineRunAssistant";

function ApigeePipelineRunAssistantOverlay( { pipeline, startPipelineRunFunction }) {
  const toastContext = useContext(DialogToastContext);

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanelFunction}
      showPanel={true}
      titleText={`Apigee Pipeline Run Assistant`}
      titleIcon={faWandMagic}
      showToasts={true}
      fullWidth={true}
      showCloseButton={false}
    >
      <ApigeePipelineRunAssistant
        pipeline={pipeline}
        startPipelineRunFunction={startPipelineRunFunction}
        closePanelFunction={closePanelFunction}
      />
    </FullScreenCenterOverlayContainer>
  );

}

ApigeePipelineRunAssistantOverlay.propTypes = {
  pipeline: PropTypes.object,
  startPipelineRunFunction: PropTypes.func,
};

export default ApigeePipelineRunAssistantOverlay;