import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SapCpqPipelineRunAssistant
  from "components/workflow/run_assistants/sap_cpq/SapCpqPipelineRunAssistant";

function SapCpqPipelineRunAssistantOverlay({ pipeline, startPipelineRunFunction }) {
  const toastContext = useContext(DialogToastContext);

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanelFunction}
      showPanel={true}
      titleText={`SAP CPQ Pipeline Run Assistant`}
      titleIcon={faWandMagic}
      showToasts={true}
      fullWidth={true}
      showCloseButton={false}
    >
      <SapCpqPipelineRunAssistant
        pipeline={pipeline}
        startPipelineRunFunction={startPipelineRunFunction}
        closePanelFunction={closePanelFunction}
      />
    </FullScreenCenterOverlayContainer>
  );

}

SapCpqPipelineRunAssistantOverlay.propTypes = {
  pipeline: PropTypes.object,
  startPipelineRunFunction: PropTypes.func,
};

export default SapCpqPipelineRunAssistantOverlay;