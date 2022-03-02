import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineStepNotificationEditorPanel
  from "components/workflow/plan/step/notifications/PipelineStepNotificationEditorPanel";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

function PipelineStepNotificationConfigurationOverlay(
  {
    pipelineStep,
    pipelineId,
    loadPipeline,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
    loadPipeline();
  };

  if (pipelineStep == null || isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Pipeline Step Notification Configuration`}
      titleIcon={faEnvelope}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"p-3"}>
        <PipelineStepNotificationEditorPanel
          pipelineId={pipelineId}
          pipelineStep={pipelineStep}
          handleCloseClick={closePanel}
        />
      </div>
    </CenterOverlayContainer>
  );
}

PipelineStepNotificationConfigurationOverlay.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  loadPipeline: PropTypes.func,
};

export default PipelineStepNotificationConfigurationOverlay;